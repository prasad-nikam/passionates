import jwt from "jsonwebtoken";

export default function authUser(req, res, next) {
    try {
        if (!req?.cookies?.token) {
            console.log(11111111111);
            return res.status(403).json({ message: "You are not logged in" });
        }

        const decoded = jwt.verify(
            req.cookies.token,
            process.env.ACCESS_TOKEN_SECRET
        );
        req.user = decoded;
        console.log(2222222222);

        next();
    } catch (error) {
        console.log(33333333333);
        if (error.name === "TokenExpiredError") {
            return res
                .status(401)
                .json({ message: "Session expired, please log in again" });
        }

        if (error.name === "JsonWebTokenError") {
            return res.status(403).json({ message: "Invalid token" });
        }

        return res.status(403).json({ message: "Authentication failed" });
    }
}
