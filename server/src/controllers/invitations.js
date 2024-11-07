import Invitation from "../modules/invitations.js";
import User from "../modules/users.js";
import jwt from "jsonwebtoken";

export const sendRequest = async (req, res) => {
    const { sendTo } = req.body;
    const decoded = jwt.verify(req.cookies.token, "cvpap");

    if (
        await Invitation.findOne({
            $or: [
                { from: decoded.id, to: sendTo },
                { from: sendTo, to: decoded.id },
            ],
        })
    ) {
        return res.status(401).send("Invitation is already sent or recieved");
    } else {
        const invitation = new Invitation({
            from: decoded.id,
            to: sendTo,
            status: "pending",
        });
        try {
            await invitation.save();
            return res.status(200).send(invitation);
        } catch (error) {
            return res.status(401).send(error);
        }
    }
};

// Accept the invitation and create relationship between two users
export const acceptRequest = async (req, res) => {
    const { invitation_id } = req.body;
    const decoded = jwt.verify(req.cookies.token, "cvpap");

    try {
        const invitation = await Invitation.findById(invitation_id);
        if (!invitation) {
            return res.status(401).send("Invalid Invitation id");
        }

        const user = await User.findOne({
            _id: decoded.id,
            friends: invitation.from,
        });
        if (user) {
            await Invitation.findByIdAndDelete(invitation_id);
            return res.status(401).send("friendship already exist");
        }

        await User.findByIdAndUpdate(decoded.id, {
            $push: { friends: invitation.from },
        });
        await User.findByIdAndUpdate(invitation.from, {
            $push: { friends: decoded.id },
        });

        await Invitation.findByIdAndDelete(invitation_id);
        return res.send("success");
    } catch (error) {
        return res.status(401).send(error);
    }
};
