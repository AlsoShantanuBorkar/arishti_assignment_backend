const jwt = require("jsonwebtoken");
const UserModel = require("../../models/UserModel");
const { findUser } = require("../../utils");

const AuthMiddleware = (socket, next) => {
  if (socket.handshake.headers.token) {
    jwt.verify(
      socket.handshake.headers.token,
      process.env.TOKEN_KEY,
      async (error, decoded) => {
        if (error) return next(new Error("Authentication Error, Please Login"));
        console.log(decoded);
       
        next();
      }
    );
  } else {
    return next(new Error("Authentication Error, Please Login"));
  }
};

module.exports = AuthMiddleware;
