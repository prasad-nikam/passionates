import User from "../modules/users.js";
import Message from "../modules/messages.js";
import cloudinary from "../utils/cloudinary.js";
import mongoose from "mongoose";
import Follow from "../modules/follow.js";

export const searchUsers = async (req, res) => {
    try {
        const { q } = req.query;

        if (!q || !q.trim()) {
            return res.json([]);
        }

        const users = await User.aggregate([
            {
                $search: {
                    index: "default",
                    text: {
                        query: q, // 🔥 hardcoded test
                        path: {
                            wildcard: "*",
                        },
                        fuzzy: {
                            maxEdits: 2,
                        },
                    },
                },
            },
            {
                $match: {
                    _id: { $ne: new mongoose.Types.ObjectId(req.user.id) },
                },
            },
        ]);

        res.status(200).json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};

export const listUsers = async (req, res) => {
    const userId = req.user.id;

    const userList = await User.find({
        _id: { $ne: userId },
    }).select("firstname lastname profilePic email");
    res.json(userList);
};

export const getUserById = async (req, res) => {
    try {
        const targetUserId = req.params.id;
        const me = req.user.id;

        const user = await User.findById(targetUserId).select(
            "-password -refreshToken"
        );

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        const follow = await Follow.exists({
            follower: me,
            following: targetUserId,
        });

        const userObj = user.toObject();

        userObj.isFollowed = !!follow;

        return res.status(200).json(userObj);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Something went wrong",
        });
    }
};

export const updateUser = async (req, res, next) => {
    const { bio, interests, privacy } = req.body;
    try {
        const decoded = req.user;
        const interestsArray = interests.split(",");
        const user = await User.updateOne(
            { _id: decoded.id },
            { bio: bio, interests: [...interestsArray], privacy: privacy }
        );
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

export const getFriends = async (req, res) => {
    const user = req.user;
    const users = await User.findById(user.id).populate("friends");
    return res.json(users.friends);
};

// ============cloudinary===============
export const uploadProfilePic = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        const imgURL = req.file.path;
        const publicID = req.file.filename;

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.profilePicPublicId) {
            await cloudinary.uploader.destroy(user.profilePicPublicId);
        }
        user.profilePic = imgURL;
        user.profilePicPublicId = publicID;
        await user.save();
        res.status(200).json({ imgURL });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

export const listChatUsers = async (req, res) => {
    const userId = req.user.id;

    try {
        // 1. Find all unique user IDs you've chatted with
        const sentTo = await Message.distinct("receiver", { sender: userId });
        const receivedFrom = await Message.distinct("sender", {
            receiver: userId,
        });

        // 2. Merge + remove duplicates
        const chatUserIds = [...new Set([...sentTo, ...receivedFrom])];

        // 3. Fetch user details
        const users = await User.find({
            _id: { $in: chatUserIds },
        }).select("firstname lastname profilePic email");

        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch chat users" });
    }
};

// export const listChatUsers = async (req, res) => {
//     const userId = req.user.id;

//     try {
//         const chats = await Message.aggregate([
//             {
//                 $match: {
//                     $or: [{ sender: userId }, { receiver: userId }],
//                 },
//             },
//             {
//                 $project: {
//                     user: {
//                         $cond: [
//                             { $eq: ["$sender", userId] },
//                             "$receiver",
//                             "$sender",
//                         ],
//                     },
//                 },
//             },
//             {
//                 $group: {
//                     _id: "$user",
//                 },
//             },
//             {
//                 $lookup: {
//                     from: "users",
//                     localField: "_id",
//                     foreignField: "_id",
//                     as: "user",
//                 },
//             },
//             {
//                 $unwind: "$user",
//             },
//             {
//                 $project: {
//                     _id: "$user._id",
//                     firstname: "$user.firstname",
//                     lastname: "$user.lastname",
//                     profilePic: "$user.profilePic",
//                     email: "$user.email",
//                 },
//             },
//         ]);

//         res.json(chats);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: "Failed to fetch chat users" });
//     }
// };
