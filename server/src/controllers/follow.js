import mongoose from "mongoose";
import Follow from "../modules/follow.js";
import User from "../modules/users.js";
export const getFollowers = async (req, res) => {
    const user = req.params.userId;
    const followers = await Follow.find({ following: user });
    return res.status(200).json(followers);
};

export const follow = async (req, res) => {
    const session = await mongoose.startSession();
    console.log("not a auth error");

    try {
        session.startTransaction();

        const toFollow = req.params.userId;
        const me = req.user.id;

        if (me === toFollow) {
            await session.abortTransaction();

            return res.status(400).json({
                message: "You cannot follow yourself",
            });
        }

        const existing = await Follow.findOne(
            {
                follower: me,
                following: toFollow,
            },
            null,
            { session }
        );

        if (existing) {
            await session.abortTransaction();

            return res.status(400).json({
                message: "Already following",
            });
        }

        await Follow.create(
            [
                {
                    follower: me,
                    following: toFollow,
                },
            ],
            { session }
        );

        await User.findByIdAndUpdate(
            me,
            {
                $inc: {
                    followingCount: 1,
                },
            },
            { session }
        );

        await User.findByIdAndUpdate(
            toFollow,
            {
                $inc: {
                    followersCount: 1,
                },
            },
            { session }
        );

        await session.commitTransaction();

        return res.status(201).json({
            message: "Successfully followed",
        });
    } catch (error) {
        await session.abortTransaction();

        console.error(error);

        return res.status(500).json({
            message: "Something went wrong",
        });
    } finally {
        await session.endSession();
    }
};

export const unfollow = async (req, res) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const me = req.user.id;
        const toUnfollow = req.params.userId;

        const follow = await Follow.findOneAndDelete(
            {
                follower: me,
                following: toUnfollow,
            },
            { session }
        );

        if (!follow) {
            await session.abortTransaction();

            return res.status(404).json({
                message: "You are not following this user",
            });
        }

        await User.findByIdAndUpdate(
            me,
            {
                $inc: {
                    followingCount: -1,
                },
            },
            { session }
        );

        await User.findByIdAndUpdate(
            toUnfollow,
            {
                $inc: {
                    followersCount: -1,
                },
            },
            { session }
        );

        await session.commitTransaction();

        return res.status(200).json({
            message: "Successfully unfollowed",
        });
    } catch (error) {
        await session.abortTransaction();

        console.error(error);

        return res.status(500).json({
            message: "Something went wrong",
        });
    } finally {
        await session.endSession();
    }
};

export const isFollowed = async (req, res) => {
    try {
        const targetUserId = req.params.userId;
        const me = req.user.id;

        const follow = await Follow.exists({
            follower: me,
            following: targetUserId,
        });

        return res.status(200).json({
            followed: !!follow,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Something went wrong",
        });
    }
};
