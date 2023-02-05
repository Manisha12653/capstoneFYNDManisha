const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const generateJwtToken = (_id, role) => {
  return jwt.sign({ _id, role }, process.env.JWT_SECERT_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.fields.email });
    console.log(user);
    if (user) {
      console.log("user already exist");
      return res.json({ msg: "user already exits" });
    }

    const { firstname, lastname, email, password } = req.fields;
    //hashing password
    const hash_password = await bcrypt.hash(password, 10);

    const _user = new User({
      firstName: firstname,
      lastName: lastname,
      email: email,
      hash_password: hash_password,
    });
    console.log(_user);
    await _user.save();
    return res.json({ msg: "Registered Successfully ..." });
  } catch (e) {
    console.log(e);
    res.status(400).json({ mess: "not able to register" });
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.fields.email });
    if (!user) {
      return res.status("401").json({
        resStatus: "failed",
        message: "We cannot find an account with that email address",
      });
    }
    if (user) {
      const isPassword = await user.authenticate(req.fields.password);
      if (isPassword) {
        const token = generateJwtToken(user._id, user.role);
        console.log("token" + token);
        const { _id, role, fullName } = user;
        res.json({
          resStatus: "success",
          token,
          user: { _id, role, fullName },
        });
      } else {
        return res.status("401").json({
          resStatus: "failed",
          message: "Incorrect Password!",
        });
      }
    }
  } catch (e) {
    console.log(e);
  }
};
