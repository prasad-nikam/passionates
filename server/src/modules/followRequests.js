import mongoose from "mongoose";

const FollowRequestSchema = new mongoose.Schema(
    {
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
    },
    {
        timestamps: true,
    }
);

const FollowRequest = mongoose.model("FollowRequest", FollowRequestSchema);
export default FollowRequest;
