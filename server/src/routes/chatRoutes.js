import express from "express";

const chatRouter = express.Router();
chatRouter.get("/", (req, res) => {
    res.send("hello chatRouer");
});

export default chatRouter;
