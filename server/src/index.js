// require("dotenv").config({ path: "./env" });
import dotenv from "dotenv";
import { Server } from "socket.io";
import { createServer } from "http";
import connectDB from "./db/index.js";
import chatRouter from "./routes/chatRoutes.js";
import chatSocket from "./sockets/chatSocket.js";
import { app } from "./app.js";

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || "localhost";

dotenv.config({
    path: "./env",
});

app.use("/chat", chatRouter);

//=============== socketIO code start ===============
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: [
            "http://192.168.20.82:5173",
            "http://localhost:5173",
            "http://127.0.0.0:5173",
        ],
        methods: ["GET", "POST"],
        credentials: true,
    },
});

chatSocket(io);

server.listen(3000, () => {
    console.log("soketio server running");
});
//=============== socketIO code end =================

connectDB()
    .then(() => {
        app.on("error", (error) => {
            console.log("App error: ", error);
            throw error;
        });
        app.listen(PORT || 8080, HOST, () => {
            console.log(`server is running on http://${HOST}:${PORT}`);
        });
    })
    .catch((err) => {
        console.log("MongoDB connection failed !!!", err);
    });
