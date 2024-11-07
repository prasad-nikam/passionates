import mongoose, { Schema } from "mongoose";

const msgSchema = mongoose.Schema({
    content: String,
    sender: {
        type: String,
    },
    reciever: {
        type: String,
    },
    time: {
        type: Date,
        default: Date.now,
    },
    status: String,
});

const Message = mongoose.model("Message", msgSchema);
export default Message;
