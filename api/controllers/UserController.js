const jwt = require("jsonwebtoken");

const UserModel = require("../../models/UserModel");
const UserController = async(req, res) => {

  const users = await UserModel.find({},{email:1,_id:0});
  return res.send(users);
};

module.exports = UserController;
