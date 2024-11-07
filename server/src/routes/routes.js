import express from "express";
import authUser from "../middlewares/basicAuth.js";
import signup from "../controllers/signup.js";
import login from "../controllers/login.js";
import getUsers, { getfriends } from "../controllers/userList.js";
import loginData from "../controllers/loginData.js";
import getMessages from "../controllers/getMessages.js";
import logout from "../controllers/logout.js";
import updateProfile from "../controllers/updateProfile.js";
import { sendRequest, acceptRequest } from "../controllers/invitations.js";

const router = express.Router();

router.get("/", authUser, getUsers);
router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/isLoggedin", authUser, loginData);
router.post("/getMessages", authUser, getMessages);
router.put("/updateprofile", authUser, updateProfile);

router.post("/sendRequest", authUser, sendRequest);
router.post("/acceptRequest", authUser, acceptRequest);
router.get("/getfriends", authUser, getfriends);

export default router;
