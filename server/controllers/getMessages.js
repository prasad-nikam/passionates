import Message from "../modules/messages.js";
import jwt from 'jsonwebtoken';


export default async (req, res) => {
    const { reciever } = req.body;
    const decoded = jwt.verify(req.cookies.token, 'cvpap');

    try {
        const msgs = await Message.find({
            $or: [
                { sender: decoded.email, reciever: reciever },
                { sender: reciever, reciever: decoded.email }
            ]
        }).sort({ time: 1 });
        res.status(200).json(msgs);
    }
    catch (err) {
        res.status(400).send("Something went wrong")
    }
}