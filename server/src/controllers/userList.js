import User from "../modules/users.js";
import jwt from "jsonwebtoken";

const getUsers = async (req, res) => {
    const users = await User.find({});
    users.map((user) => {
        user.password = undefined;
        // user.socketID = undefined;
    });
    return res.json(users);
};
export default getUsers;

export const getfriends = async (req, res) => {
    const decoded = jwt.verify(req.cookies.token, "cvpap");
    const users = await User.findById(decoded.id).populate("friends");

    console.log(users.friends);

    return res.json(users.friends);
};
