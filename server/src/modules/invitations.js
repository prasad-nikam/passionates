import mongoose from "mongoose";

const InvitationSchema = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ["pending", "accepted", "denied"],
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    time: {
        type: Date,
        default: Date.now,
    },
});

const Invitation = mongoose.model("Invitation", InvitationSchema);
export default Invitation;
