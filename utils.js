const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("./models/UserModel");

async function encryptPassword(password) {
  return await bcrypt.hash(password, 10);
}

async function jwtDecode(token) {
  return await jwt.decode(token, process.env.TOKEN_KEY);
}

async function findUser(email) {
  return await UserModel.findOne({ email: email });
}

module.exports = {
  encryptPassword,
  jwtDecode,
  findUser,
};
