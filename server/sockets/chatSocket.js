import jwt from "jsonwebtoken";
import User from "../modules/users.js";
import Message from "../modules/messages.js";


const chatSocket = (io) => {

    io.on("connection", async (socket) => {
        const cookie = socket.handshake.headers.cookie;
        if (cookie) {
            const token = cookie.slice(6)

            try {
                const decoded = jwt.verify(token, 'cvpap');
                const user = await User.updateOne({ _id: decoded.id }, { socketID: socket.id });

                socket.on("message", async (data) => {
                    // console.log(data);
                    const email = data.user.email;
                    const reciever = await User.findOne({ email: email });
                    // console.log(reciever);
                    io.to(reciever.socketID).emit("receive-message", { message: data.message, from: decoded.email });


                    try {
                        const sender = await User.findOne({ _id: decoded.id })

                        const msg = new Message({
                            content: data.message,
                            sender: sender.email,
                            reciever: email,
                        });

                        await msg.save();
                    } catch (error) {
                        console.log(error);
                    }
                })

            } catch (error) {
                //do nothing
            }
        }
    })
};

export default chatSocket;