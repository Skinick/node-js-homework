const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../../models");
const { HttpError } = require("../../helpers");
const { JWT_SECRET } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!user || !passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = login;