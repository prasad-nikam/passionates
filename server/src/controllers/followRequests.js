import Invitation from "../modules/followRequests.js";
import User from "../modules/users.js";
import jwt from "jsonwebtoken";
import FollowRequest from "../modules/followRequests.js";
import Follow from "../modules/follow.js";

export const sendRequest = async (req, res) => {
    const sendTo = req.params.id;
    const me = req.user.id;

    if (
        await FollowRequest.findOne({
            from: me,
            to: sendTo,
        })
    ) {
        return res.status(401).send("Request is already sent or recieved");
    } else {
        const followRequest = new FollowRequest({
            from: me,
            to: sendTo,
            status: "pending",
        });
        try {
            await followRequest.save();
            // todo: send notification to requested user
            return res.status(201).json({
                message: "Success",
            });
        } catch (error) {
            return res.status(401).send(error);
        }
    }
};

// Accept the invitation and create relationship between two users
export const acceptRequest = async (req, res) => {
    const { invitation_id } = req.body;
    const decoded = jwt.verify(req.cookies.token, "cvpap");
    const me = req.user.id;

    try {
        const followRequest = await FollowRequest.findById(invitation_id);
        if (!followRequest) {
            return res.status(401).send("Invalid followRequest id");
        }

        const follow = new Follow({
            follower: followRequest.from,
            following: followRequest.to,
        });

        await follow.save();
        await FollowRequest.findByIdAndUpdate(invitation_id, {
            status: "accepted",
        });
        // todo: send notification to requesting user
        return res.status(201).json({
            message: "Success",
        });
    } catch (error) {
        return res.status(401).send(error);
    }
};
