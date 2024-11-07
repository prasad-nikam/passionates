import jwt from "jsonwebtoken";
export default function authUser(req, res, next) {
    try {
        if (!req?.cookies?.token) {
            return res.status(403).send("You are not logged in");
        }
        jwt.verify(req.cookies.token, "cvpap");
        next();
    } catch (error) {
        next(error);
    }
}
