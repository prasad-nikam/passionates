import jwt from "jsonwebtoken";
import User from "../modules/users.js";
const chatSocket = (io) => {

    io.on("connection", async (socket) => {
        const cookie = socket.handshake.headers.cookie;
        if (cookie) {
            const token = cookie.slice(6)

            const decoded = jwt.verify(token, 'cvpap');
            const user = await User.updateOne({ _id: decoded.id }, { socketID: socket.id });

            // socket.broadcast.emit("welcome", `welcome to server ${socket.id}`);

            socket.on("message", async (data) => {
                console.log(data);
                const email = data.user.email;
                const sendTo = await User.findOne({ email: email });
                console.log(sendTo);
                io.to(sendTo.socketID).emit("receive-message", { message: data.message, from: decoded.email });
            })
        }
    })
};

export default chatSocket;