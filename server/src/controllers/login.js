import User from "../modules/users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async (req, res) => {
    //---- get all data from fromtend
    const { email, password } = req.body;

    //---- Validation
    if (!(email || password)) {
        res.status(400).send("missing data fields");
    }

    //----find user in db
    await User.findOne({ email: email }).then(async (user) => {
        if (user) {
            //----if user exists and password is correct
            if (user && (await bcrypt.compare(password, user.password))) {
                //----creating jwt token
                const token = jwt.sign(
                    { id: user._id, email },
                    "cvpap", //---- process.env.jwtSecreateKey
                    { expiresIn: "48s" }
                );
                // user.token=token;
                user.password = undefined;

                //-----cookies section
                const options = {
                    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                    httpOnly: true, //cookies could not be accesed on browser directly
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
