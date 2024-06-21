import Relationship from "../modules/relationships.js";
import Invitation from "../modules/invitations.js";
import jwt from "jsonwebtoken";

export const sendRequest = async (req, res) => {
  const { sendTo } = req.body;
  const decoded = jwt.verify(req.cookies.token, "cvpap");

  const invitation = new Invitation({
    from: decoded.indexOf,
    to: sendTo,
    status: "pending",
  });

  await invitation.save();
};

export const acceptRequest = (req, res) => {
  const { inviter } = req.body;
  const decoded = jwt.verify(req.cookies.token, "cvpap");

  const rel = new Relationship({
    user_id: decoded.id,
    related_user_id: inviter,
  });
};
