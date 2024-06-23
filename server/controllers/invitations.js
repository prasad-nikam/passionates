import Relationship from "../modules/relationships.js";
import Invitation from "../modules/invitations.js";
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

        if (
            await Relationship.findOne({
                $or: [
                    { user_id: decoded.id, related_user_id: invitation.from },
                    { user_id: invitation.from, related_user_id: decoded.id },
                ],
            })
        ) {
            return res.status(401).send("Relationship already exist");
        }

        const rel = new Relationship({
            user_id: decoded.id,
            related_user_id: inviter,
        });
        await rel.save();

        await Invitation.findByIdAndDelete(invitation_id);
        return res.send("success");
    } catch (error) {
        return res.status(401).send(error);
    }
};
