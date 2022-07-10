const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAssync');
const axios = require('axios');
exports.protect = catchAsync(async (req, res, next) => {
  //? Check if token exists
  if (!req.cookies.jwt)
    return next(
      new AppError(
        'You are not logged in! Please login to get access.',
        401
      )
    );
  const response = await axios.get(
    'http://gateway:3000/users/api/authentcateUserWithJWT/' +
      req.cookies.jwt
  );
  req.user = response.data.data;
  next();
});
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(
          "You don' You have no permissions to perform this action"
        ),
        403
      );
    }
    next();
  };
};
