export default async (req, res) => {
    res.status(200)
        .cookie("token", "", { httpOnly: true })
        .send("You are logged out");
};
