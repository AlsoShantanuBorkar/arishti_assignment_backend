const UserModel = require("../../models/UserModel");
const { encryptPassword, findUser } = require("../../utils");

const jwt = require("jsonwebtoken");

const RegistraionController = async (req, res) => {
  try {
    const { first_name, last_name, email, password, fcm_token } = req.body;

    if (!(first_name && last_name && email && password)) {
      return res.status(400).send("Invalid Input");
    }

    const checkExistingUser = await findUser(email);
    if (checkExistingUser)
      return res
        .status(300)
        .send("Email Already Exists, Please use another email");

    const encryptedPassword = await encryptPassword(password);

    const user = new UserModel({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    if (fcm_token) {
      user.fcm_token = fcm_token;
    }

    const data = await user.save();
    const token = jwt.sign(
      { id: user._id, email, first_name, last_name },
      process.env.TOKEN_KEY,
      { expiresIn: "10h" }
    );

    user.token = token;
    return res.status(200).json(user);
  } catch (e) {
    console.log(e);
  }
};

module.exports = RegistraionController;
