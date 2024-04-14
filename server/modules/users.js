import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
    interests: {
        type: [String],
    },
    bio: {
        type: String,
    },
    posts: {
        type: mongoose.Schema.Types.ObjectId,
    },
    socketID: {
        type: String
    }
})

const User = mongoose.model("User", userSchema);

export default User;