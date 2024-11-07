import User from "../modules/users.js";
import jwt from "jsonwebtoken";

const updateProfile = async (req, res) => {
    const { bio, interests } = req.body;

    try {
        const decoded = jwt.verify(req.cookies.token, "cvpap");

        const interestsArray = interests.split(",");
        console.log(interestsArray);
        const user = await User.updateOne(
            { _id: decoded.id },
            { bio: bio, interests: [...interestsArray] }
        );
    } catch (err) {
        //
    }

    res.status(200).send("Updated Successfuly");
};

export default updateProfile;
