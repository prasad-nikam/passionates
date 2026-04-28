import jwt from "jsonwebtoken";
import Message from "../modules/messages.js";

const onlineUsers = new Map();

const chatSocket = (io) => {
    io.on("connection", async (socket) => {
        try {
            const cookies = Object.fromEntries(
                socket.handshake.headers.cookie
                    ?.split("; ")
                    .map((c) => c.split("=")) || []
            );

            const token = cookies.token;
            if (!token) return socket.disconnect();

            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            socket.join(decoded.id);
            onlineUsers.set(decoded.id, socket.id);

            socket.on("chat:sent", async ({ text, receiverId }) => {
                if (!text || !receiverId) return;

                io.to(receiverId).emit("chat:receive", {
                    text: text,
                });

                Message.create({
                    text: text,
                    sender: decoded.id,
                    receiver: receiverId,
                    status: "unseen",
                }).catch((err) => console.error("DB error:", err));
            });

            socket.on("disconnect", () => {
                onlineUsers.delete(decoded.id);
            });
        } catch (error) {
            socket.disconnect();
            console.log(error);
        }
    });
};

export default chatSocket;
