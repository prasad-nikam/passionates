import User from "../modules/users.js";

export const listUsers = async (req, res) => {
    let userList = await User.find({});
    userList.map((user) => {
        user.password = undefined;
    });
    return res.json(userList);
};

export const getUserById = async (req, res) => {
    let user = await User.findById(req.params.id);
    user.password = undefined;
    return res.json(user);
};

export const updateUser = async (req, res, next) => {
    const { bio, interests } = req.body;
    try {
        const decoded = req.user;
        const interestsArray = interests.split(",");
        const user = await User.updateOne(
            { _id: decoded.id },
            { bio: bio, interests: [...interestsArray] }
        );
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

export const getFriends = async (req, res) => {
    const user = req.user;
    const users = await User.findById(user.id).populate("friends");
    return res.json(users.friends);
};
