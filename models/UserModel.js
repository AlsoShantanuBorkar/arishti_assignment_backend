const { mongoose } = require("mongoose");

const UserModel = new mongoose.Schema({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
  fcm_token: { type: String,unique:true},
});

module.exports = mongoose.model("users", UserModel);
