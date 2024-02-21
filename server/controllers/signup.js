import User from "../modules/users.js";
import bcrypt from 'bcryptjs';
import  jwt  from "jsonwebtoken";

export default async (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    if (await User.findOne({ email: email })) {
        res.status(401).send("Email ia already registerd");
    } else {

        const encPassword = await bcrypt.hash(password,10)

        const user1 = new User({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: encPassword,
        });
        
        const user = await user1.save();
        console.log(user);

        const token = jwt.sign(
            {id:user._id,email},
            'cvpap', // process.env.jwtSecreateKey
            {expiresIn:"2h"}
        );

        user.token = token;
        user.password = undefined;

        res.status(201).json({user,token :token});

    }

}