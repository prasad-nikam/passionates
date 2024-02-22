import express from "express";
import mongoose from "mongoose";
import bodyParser from 'body-parser';
import cors from 'cors'
import cookieParser from "cookie-parser";
import jwt from 'jsonwebtoken';

import authUser from "./basicAuth.js";

import signup from "./controllers/signup.js";
import login from "./controllers/login.js";
import getUsers from "./controllers/userList.js";
import loginData from "./controllers/loginData.js";

const app = express();
const PORT = 8080;
const MONGO_URL = "mongodb://127.0.0.1:27017/passionates";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:5173","http://192.168.43.192:5173"],
    methods: ['GET', 'POST'],
    credentials: true,
}));


app.get('/',authUser,getUsers)
app.post('/signup', signup)
app.post('/login', login)
app.get('/isLoggedin',authUser,loginData)


mongoose.connect(MONGO_URL).then(() => {
    console.log("Mongoose Connected Successfully");
    app.listen(PORT, () => {
        console.log(`server is running on http://localhost:${PORT}`);
    })
}).catch((err) => {
    console.log(err);
})