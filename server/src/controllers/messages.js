import Message from "../modules/messages.js";
import mongoose from "mongoose";
export const getMessages = async (req, res) => {
    const receiver = req.params.userId;
    const decoded = req.user;

    if (!receiver) {
        return res.status(400).json({ message: "Receiver ID required" });
    }

    if (!mongoose.Types.ObjectId.isValid(receiver)) {
        return res.status(400).json({ message: "Receiver ID required" });
    }

    try {
        const msgs = await Message.find({
            $or: [
                { sender: decoded.id, receiver: receiver },
                { sender: receiver, receiver: decoded.id },
            ],
        }).sort({ createdAt: 1 });

        res.status(200).json(msgs);
    } catch (err) {
        res.status(400).send("Something went wrong");
    }
};
