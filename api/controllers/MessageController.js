const MessageModel = require("../../models/MessageModel");
const { findUser, jwtDecode } = require("../../utils");

const MessageController = async (req, res) => {
  if (!(req.body.userOne && req.body.userTwo)) {
    return res.status(400).json({ message: "Invalid User Email" });
  }
  const decodedToken = await jwtDecode(req.headers.token);

  if (req.body.userOne.toLowerCase() != decodedToken.email) {
    return res.status(400).json({ message: "AUth Error" });
  }

  const userOne = await findUser(req.body.userOne.toLowerCase());

  const userTwo = await findUser(req.body.userTwo.toLowerCase());

  if (!(userOne && userTwo)) {
    return res.status(400).json({ message: "Unable to find users" });
  }

  const messages = await MessageModel.find(
    {
      $or: [
        {
          userOne: userOne.email,
          userTwo: userTwo.email,
        },
        {
          userOne: userTwo.email,
          userTwo: userOne.email,
        },
      ],
    },
    { userOne: 1, message: 1, _id: 0 }
  );

  return res.status(200).json(messages);
};
module.exports = MessageController;
