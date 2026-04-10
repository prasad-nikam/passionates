import express from "express";
import authUser from "../middlewares/basicAuth.js";
import { getMessages } from "../controllers/messages.js";
import { sendRequest, acceptRequest } from "../controllers/invitations.js";
import { login, signup, getMe, logout } from "../controllers/auth.js";
import {
    listUsers,
    getUserById,
    updateUser,
    getFriends,
    uploadProfilePic,
} from "../controllers/users.js";
import { upload } from "../utils/multer.js";

const router = express.Router();

router.get("/", (req, res) => res.status(200).json({ success: "ok" }));

router.post(
    "/upload-profile",
    authUser,
    upload.single("profilePic"),
    uploadProfilePic
);

// auth.routes.js
router.post("/auth/signup", signup);
router.post("/auth/login", login);
router.delete("/auth/logout", authUser, logout);
router.get("/auth/me", authUser, getMe);

// users.routes.js
router.get("/users", authUser, listUsers);
router.get("/users/:id", authUser, getUserById);
router.patch("/users", authUser, updateUser);
router.get("/users/:id/friends", authUser, getFriends);

// Invitation.routes.js
router.post("/invitations/send", authUser, sendRequest);
router.post("/invitations/accept", authUser, acceptRequest);

// messages.routes.js
router.get("/messages/:userId", authUser, getMessages);
// router.post("/messages/:userId", authUser, sendMessage);

export default router;
