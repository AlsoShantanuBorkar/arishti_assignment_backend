const UserModel = require("../../models/UserModel");
const { encryptPassword } = require("../../utils");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const LoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).send("Invalid Input");
    }

    const checkExistingUser = await UserModel.findOne({ email });
    if (!checkExistingUser)
      return res
        .status(300)
        .send("Email Does not exist please enter Valid Email");

    const encryptedPassword = await encryptPassword(password);

    if (await bcrypt.compare(checkExistingUser.password, encryptedPassword))
      return res.status(300).send("Incorrect Password");

    const token = jwt.sign(
      {
        user_id: checkExistingUser._id,
        email,
        first_name: checkExistingUser.first_name,
        last_name: checkExistingUser.last_name,
      },
      process.env.TOKEN_KEY,
      { expiresIn: "10h" }
    );
    checkExistingUser.token = token;
    res.status(200).json(checkExistingUser);
  } catch (e) {
    console.log(e);
  }
};

module.exports = LoginController;
