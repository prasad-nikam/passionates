import User from "../modules/users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async (req, res) => {
    const { email, password } = req.body;

    if (!(email || password)) {
        res.status(400).send("missing data fields");
    }

    await User.findOne({ email: email }).then(async (user) => {
        if (user) {
            if (user && (await bcrypt.compare(password, user.password))) {
                const token = jwt.sign(
                    { id: user._id, email },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
                );
                user.password = undefined;
                const options = {
                    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                    httpOnly: true,
                };
                res.status(200)
                    .cookie("token", token, options)
                    .json({ success: true, user });
            } else {
                res.status(403).send("Incorrect Password");
            }
        } else {
            res.status(403).send("user not found");
        }
    });
};
