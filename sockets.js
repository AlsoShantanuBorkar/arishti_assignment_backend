const { Server } = require("socket.io");
const app = require("./app");
const server = require("http").createServer(app);
const jwt = require("jsonwebtoken");
const AuthMiddleware = require("./api/middleware/AuthMiddlewear");
const sendNotification = require("./Firebase");
const { findUser } = require("./utils");
const MessageModel = require("./models/MessageModel");

const io = new Server(server, {
  origin: "*",
  methods: ["GET", "POST"],
});

io.use(AuthMiddleware).on("connection", (socket) => {
  socket.on("send_message", async ({ message, userOne, userTwo, from }) => {
    var user = jwt.decode(
      socket.handshake.headers.token,
      process.env.TOKEN_KEY
    );

    if (user.email != userOne.toString().toLowerCase()) {
      socket.emit(
        "send_message",
        new Error("Auth Error : Email does not match Token")
      );
      socket.disconnect();
      return;
    }

    const receiver = await findUser(userTwo);
    if (receiver) {
      const fcm_token = receiver.fcm_token;

      const data = new MessageModel({
        userOne: userOne,
        userTwo: userTwo,
        from: from,
        message,
      });
      await data.save();

      const payload = {
        token: fcm_token,
        notification: {
          title: `Message from ${user.email} `,
          body: message,
        },
      };

      sendNotification(payload);
      socket.broadcast.emit(userTwo, {
        from: user.email,
        message,
      });
    } else if (!receiver) {
      socket.emit("send_message", { message: "User Not Found" });
    }
  });

  socket.on("disconnect", () => {
    console.log("User  disconnected ");
  });
});

module.exports = server;
