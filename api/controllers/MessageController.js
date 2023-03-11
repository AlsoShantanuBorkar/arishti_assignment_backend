const MessageModel = require("../../models/MessageModel");
const { findUser, jwtDecode } = require("../../utils");

const MessageController = async (req, res) => {

  if (!(req.body.sender_email && req.body.receiver_email)) {
    return res.status(400).json({ message: "Invalid User Email" });
  }
  const decodedToken = await jwtDecode(req.headers.token);


  if (req.body.sender_email.toLowerCase() != decodedToken.email) {
    return res.status(400).json({ message: "AUth Error" });
  }

  const sender_email = await findUser(req.body.sender_email.toLowerCase());

  const receiver_email = await findUser(req.body.receiver_email.toLowerCase());

  if (!(sender_email && receiver_email)) {
    return res.status(400).json({ message: "Unable to find users" });
  }


  const messages = await MessageModel.find(
    {
      $or: [
        {
          sender_email: sender_email.email,
          receiver_email: receiver_email.email,
        },
        {
          sender_email: receiver_email.email,
          receiver_email: sender_email.email,
        },
      ],
    },
    { sender_email: 1, message: 1, _id: 0 }
  );

  return res.status(200).json(messages);
};
module.exports = MessageController;
