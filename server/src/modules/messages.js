import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
        },
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        replyto: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
        },
        status: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
