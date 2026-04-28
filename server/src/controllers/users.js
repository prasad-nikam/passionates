import User from "../modules/users.js";
import cloudinary from "../utils/cloudinary.js";
import mongoose from "mongoose";

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
    let user = await User.findById(req.params.id);
    user.password = undefined;
    return res.json(user);
};

export const updateUser = async (req, res, next) => {
    const { bio, interests } = req.body;
    try {
        const decoded = req.user;
        const interestsArray = interests.split(",");
        const user = await User.updateOne(
            { _id: decoded.id },
            { bio: bio, interests: [...interestsArray] }
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

// ==============local storage upload logic ============================
// export const uploadProfilePic = async (req, res) => {
//     if (!req.file) {
//         res.status(400).json({ message: "No file uploaded" });
//     }
//     const imageUrl = `/uploads/${req.file.filename}`;
//     await User.findByIdAndUpdate(req.user.id, { profilePic: imageUrl });

//     res.status(200).json({
//         message: "File uploaded",
//         filepath: imageUrl,
//     });
// };
