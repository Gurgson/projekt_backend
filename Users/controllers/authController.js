const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAssync');
const jwt = require('jsonwebtoken');
const AppError = require('./../utils/appError');

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};
exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    name: req.body.name,
    surname: req.body.surname
  });
  const token = signToken(newUser._id);
  newUser.password = null;
  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser
    }
  });
});
exports.login = catchAsync(async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email) return next(new AppError('Please provide your email ', 400));
  if (!password) return next(new AppError('Please provide your email', 400));
  const user = await User.findOne({ email: email }).select('+password');
  if (!user || !(await user.correctPassword(password, user.password)))
    return next(new AppError('Incorrect Email or Password', 401));
  console.log(user._id);
  const token = signToken(user._id);
  console.log(token);
  res.status(200).json({
    status: 'success',
    token
  });
});
exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    console.log(token);
    token = req.headers.authorization.split(' ')[1];
  }
  console.log(token);
  if (!token) return next(new AppError("You're not logged in", 401));
  next();
});
