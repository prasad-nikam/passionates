import express from "express";
import authUser from "../middlewares/basicAuth.js";

// import loginData from "../controllers/loginData.js";
// import updateProfile from "../controllers/updateProfile.js";

import { getMessages } from "../controllers/messages.js";
import { sendRequest, acceptRequest } from "../controllers/invitations.js";
import { login, signup, getMe, logout } from "../controllers/auth.js";
import {
    listUsers,
    getUserById,
    updateUser,
    getFriends,
} from "../controllers/users.js";

const router = express.Router();

// router.post("/signup", signup);
// router.post("/login", login);
// router.get("/logout", logout);
// router.get("/isLoggedin", authUser, loginData);
// router.post("/getMessages", authUser, getMessages);
// router.put("/updateprofile", authUser, updateProfile);

router.get("/", (req, res) => res.status(200).json({ success: "ok" }));

// router.post("/sendRequest", authUser, sendRequest);
// router.post("/acceptRequest", authUser, acceptRequest);
// router.get("/getfriends", authUser, getFriends);

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
