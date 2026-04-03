import User from "../modules/users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
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

export const signup = async (req, res) => {
    console.log("kasjdfhkassd");
    const { firstname, lastname, email, password } = req.body;

    if (await User.findOne({ email: email })) {
        res.status(401).send("Email ia already registerd");
    } else {
        const encPassword = await bcrypt.hash(password, 10);

        const user1 = new User({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: encPassword,
        });

        const user = await user1.save();
        console.log(user);

        const token = jwt.sign(
            { id: user._id, email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
        );

        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true, //cookies could not be accesed on browser directly
        };

        user.token = token;
        user.password = undefined;

        res.status(201)
            .cookie("token", token, options)
            .json({ success: true, user });
    }
};

export const logout = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out" });
};

export const getMe = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.user.id });
        user.password = undefined;
        return res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};
