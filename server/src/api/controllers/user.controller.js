const userModel = require("../models/user.model");
const crypto = require("crypto");

const addUser = async (req, res, next) => {
  /**
   * fullname - Full Name of the user
   * username - Alias of user (by their choice)
   * password - Password of the user
   * role - Set of permissions granted to the user. These are used for authorization and can be customized.
   */
  const { fullname, username, password, role } = req.body;

  if (!fullname || !username || !password)
    return next(new Error("One or more parameters are missing."));

  if (!(role instanceof Array || role === undefined))
    return next(
      new Error(`Role must be an array of ID's [received : ${typeof role}]`)
    );

  const hashPass = crypto
    .createHash("SHA256", {
      defaultEncoding: "utf8",
    })
    .update(password)
    .digest("hex");

  const newUser = await new userModel({
    fullname,
    username,
    password: hashPass,
    rights: role,
  }).save();

  if (!newUser)
    return next(new Error("Something went wrong. Please try again."));

  return res.status(200).json({
    message: "Welcome, " + fullname,
    user: newUser,
  });
};

const getAllUsers = async (req, res, next) => {
  const users = await userModel.find();
  return res.status(200).json({ users });
};

const login = async (req, res, next) => {
  const { username, password } = req.body;
  const hashPass = crypto
    .createHash("SHA256", {
      defaultEncoding: "utf8",
    })
    .update(password)
    .digest("hex");
  const user = await userModel.findOne({ username, password: hashPass });

  if (!user) return next(new Error("Invalid Credentials. Please Try again."));
  const token = require("../utils/jwt").generateToken(user);

  return res.status(200).json({
    message: "Login Successful",
    user,
    token,
  });
};

module.exports = {
  addUser,
  getAllUsers,
  login,
};
