const { mongoose } = require("mongoose");

const MessageModel = new mongoose.Schema({
  userOne: { type: String, default: null },
  userTwo: { type: String, default: null },
  from:{type:String,default:null},
  message: { type: String, default: "" },
});

module.exports = mongoose.model("messages", MessageModel);
