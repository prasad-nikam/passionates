import Message from "../modules/messages.js";

export const getMessages = async (req, res) => {
    const reciever = req.param.userId;
    const decoded = req.user;

    try {
        const msgs = await Message.find({
            $or: [
                { sender: decoded.email, reciever: reciever },
                { sender: reciever, reciever: decoded.email },
            ],
        }).sort({ time: 1 });
        res.status(200).json(msgs);
    } catch (err) {
        res.status(400).send("Something went wrong");
    }
};
