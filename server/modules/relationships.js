import mongoose from "mongoose";

const relationshipSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  related_user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Relationship = mongoose.model("Relationship", relationshipSchema);
export default Relationship;
