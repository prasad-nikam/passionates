import { Server } from "socket.io";
import { createServer } from "http";
import connectDB from "./db/index.js";
import chatRouter from "./routes/chatRoutes.js";
import chatSocket from "./sockets/chatSocket.js";
import { app } from "./app.js";

const PORT = process.env.PORT || 8080;

app.use("/chat", chatRouter);

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CORS_ORIGIN,
        methods: ["GET", "POST"],
        credentials: true,
    },
});

chatSocket(io);

connectDB()
    .then(() => {
        server.listen(PORT, () => {
            console.log(`server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log("MongoDB connection failed !!!", err);
    });
