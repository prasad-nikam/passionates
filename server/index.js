import express from "express";
import mongoose from "mongoose";
import bodyParser from 'body-parser';
import cors from 'cors'
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import { createServer } from "http";
// 
import chatRouter from "./routes/chatRoutes.js";
import router from "./routes/routes.js";
// 
import chatSocket from "./sockets/chatSocket.js";

const app = express();
const PORT = 8080;
const HOST = "localhost";
const MONGO_URL = "mongodb://127.0.0.1:27017/passionates";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:5173", "http://192.168.20.82:5173", "http://127.0.0.0:5173"],
    methods: ['GET', 'POST', 'PUT'],
    credentials: true,
}));

app.use('/chat', chatRouter)
app.use('/', router)

//=============== socketIO code start ===============
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://192.168.20.82:5173", "http://localhost:5173", "http://127.0.0.0:5173"],
        methods: ["GET", "POST"],
        credentials: true
    }
});

chatSocket(io);

server.listen(3000, () => {
    console.log("soketio server running")
})
//=============== socketIO code end =================


mongoose.connect(MONGO_URL).then(() => {
    console.log("Mongoose Connected Successfully");
    app.listen(PORT, HOST, () => {
        console.log(`server is running on http://127.${HOST}:${PORT}`);
    })
}).catch((err) => {
    console.log(err);
})