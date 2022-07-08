const { promisify } = require('util');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAssync');
const jwt = require('jsonwebtoken');
const AppError = require('./../utils/appError');
const catchAssync = require('./../utils/catchAssync');

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const createAndSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true
  };
  if (process.env.NODE_ENV === 'production') {
    cookie.option.secure = true;
  }
  user.password = null;
  res.cookie('jwt', token, cookieOptions);
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
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
  createAndSendToken(newUser, 201, res);
});
exports.login = catchAsync(async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email) return next(new AppError('Please provide your email ', 400));
  if (!password) return next(new AppError('Please provide your email', 400));
  const user = await User.findOne({ email: email }).select('+password');
  if (!user || !(await user.correctPassword(password, user.password)))
    return next(new AppError('Incorrect Email or Password', 401));
  createAndSendToken(user, 200, res);
});
exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(new AppError("You're not logged in", 401));
  }
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const isLogged = await User.findById(decoded.id);
  if (!isLogged) {
    return next(new AppError('User no longer exists', 401));
  }
  if (isLogged.changedPasswordAfter(decoded.iat)) {
    return next(new AppError('User changed password, Please Login Again', 401));
  }
  req.user = isLogged;
  next();
});
exports.restricTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.users.role)) {
      return next(new AppError("You don' You have no permissions to perform this action"), 403);
    }
    next();
  };
};
exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');
  if (!user) {
    return next(new AppError('Your account is not in database'), 401);
  }

  if (!(await user.correctPassword(req.body.currentPassword, user.password))) {
    return next(new AppError('Wrong password'), 400);
  }
  console.log(req.body.newPassword, req.body.passwordConfirm);
  user.password = req.body.newPassword;
  user.passwordConfirm = req.body.passwordConfirm;
  console.log(user);
  await user.save();
  createAndSendToken(user, 201, res);
});
