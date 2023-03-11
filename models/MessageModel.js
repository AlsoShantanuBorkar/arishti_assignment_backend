const { mongoose } = require("mongoose");

const MessageModel = new mongoose.Schema({
  sender_email: { type: String, default: null },
  receiver_email: { type: String, default: null },
  message: { type: String, default: "" },
});

module.exports = mongoose.model("messages", MessageModel);
