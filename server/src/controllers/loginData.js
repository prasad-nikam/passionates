import User from "../modules/users.js";
import jwt from "jsonwebtoken";

export default async (req, res, next) => {
    try {
        const decoded = jwt.verify(req.cookies.token, "cvpap");
        const user = await User.findOne({ _id: decoded.id });
        user.password = undefined;
        // console.log(user);
        return res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};
