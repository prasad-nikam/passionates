import User from "../modules/users.js"
const getUsers = async (req, res) =>{
    const users = await User.find({});
    users.map(user =>{
        user._id = undefined
        user.password =undefined
    })

    res.json(users);
}

export default getUsers