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
const MONGO_URL = "mongodb://127.0.0.1:27017/passionates";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:5173", "http://192.168.43.192:5173"],
    methods: ['GET', 'POST'],
    credentials: true,
}));

app.use('/chat', chatRouter)
app.use('/', router)

//=============== socketIO code start ===============
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173", "http://192.168.43.192:5173"],
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
    app.listen(PORT, () => {
        console.log(`server is running on http://localhost:${PORT}`);
    })
}).catch((err) => {
    console.log(err);
})