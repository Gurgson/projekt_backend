const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAssync');
const AppError = require('./../utils/appError');
const APIfeatures = require('./../utils/APIfeatures');
const fitlerObj = (obj, ...allowedFields) => {
  let newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
exports.getAllUsers = catchAsync(async (req, res) => {
  const features = new APIfeatures(User.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const users = await features.query;
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users
    }
  });
});
exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'There is dedicated tool for updating your password'
      ),
      400
    );
  }
  const filteredBody = fitlerObj(
    req.body,
    'name',
    'surname',
    'email'
  );
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    filteredBody,
    {
      runValidators: true,
      new: true
    }
  );
  res.status(200).json({
    status: 'success',
    data: updatedUser
  });
});
exports.delteteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, {
    active: false
  });
  res.status(204).json({
    status: 'success',
    data: null
  });
});
exports.getUserById = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.id);
  res.status(200).json({
    status: 'success',
    data: user
  });
});
exports.updateUser = catchAsync(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  res.status(201).json({
    status: 'success',
    data: user
  });
});
exports.deleteUser = catchAsync(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'success',
    data: null
  });
});
