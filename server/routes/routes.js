import express from "express";
import authUser from "../basicAuth.js";
import signup from "../controllers/signup.js";
import login from "../controllers/login.js";
import getUsers from "../controllers/userList.js";
import loginData from "../controllers/loginData.js";
import getMessages from "../controllers/getMessages.js";
import logout from "../controllers/logout.js";
import updateProfile from "../controllers/updateProfile.js";

const router = express.Router();

router.get('/', authUser, getUsers);
router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);
router.get('/isLoggedin', authUser, loginData);
router.post('/getMessages', authUser, getMessages)
router.put('/updateprofile', authUser, updateProfile)
export default router;
