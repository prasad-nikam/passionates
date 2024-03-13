import express from "express";
import authUser from "../basicAuth.js";
import signup from "../controllers/signup.js";
import login from "../controllers/login.js";
import getUsers from "../controllers/userList.js";
import loginData from "../controllers/loginData.js";
import getMessages from "../controllers/getMessages.js";

const router = express.Router();

router.get('/', authUser, getUsers);
router.post('/signup', signup);
router.post('/login', login);
router.get('/isLoggedin', authUser, loginData);
router.post('/getMessages', authUser, getMessages)

export default router;
