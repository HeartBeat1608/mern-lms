const UserModel = require("../models/user.model");

const getAllUsers = async (req, res, next) => {
  const users = await UserModel.find();
  res.status(200).json({
    message: "Users Collected Successfully",
    users,
  });
};

const login = async (req, res, next) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username, password });

  if (user) {
    return res.status(200).json({
      message: "Login Successfull",
      user: {
        _id: user._id,
        username: username,
        fullname: user.fullname,
        email: user.email,
        contact: user.contact,
      },
    });
  } else {
    res.setStatus(401);
    return next(new Error("Invalid Credentials"), req, res);
  }
};

const register = async (req, res, next) => {
  const { fullname, username, password, contact } = req.body;

  const oldUser = await UserModel.find({ username });
  if (oldUser) return next(new Error("Username already taken"));

  const newUser = await new UserModel({
    fullname,
    username,
    password,
    contact,
  }).save();

  if (newUser) {
    return res.status(201).json({
      message: "User Created Successfully",
      user: {
        _id: newUser._id,
        username: username,
        fullname: fullname,
        contact: contact,
      },
    });
  } else {
    return next(new Error("User Creation Failed"));
  }
};

module.exports = {
  getAllUsers,
  login,
  register,
};
