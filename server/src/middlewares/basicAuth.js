import jwt from "jsonwebtoken";

export default function authUser(req, res, next) {
    try {
        if (!req?.cookies?.token) {
            return res.status(403).json({ message: "You are not logged in" });
        }

        const decoded = jwt.verify(
            req.cookies.token,
            process.env.ACCESS_TOKEN_SECRET
        );
        req.user = decoded;
        next();
    } catch (error) {
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
