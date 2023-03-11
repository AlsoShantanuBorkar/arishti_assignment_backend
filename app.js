require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const LoginController = require("./api/controllers/LoginController");
const RegistraionController = require("./api/controllers/RegistraionController");
const UserController = require("./api/controllers/UserController");
const MessageController = require("./api/controllers/MessageController");
const cors = require('cors');
const app = express();

app.use(express.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/register", RegistraionController);
app.post("/login", LoginController);
app.get("/users",UserController);
app.post("/messages",MessageController);
module.exports = app;
