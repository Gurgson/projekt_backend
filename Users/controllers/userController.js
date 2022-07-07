const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAssync');
exports.getAllUsers = catchAsync(async (req, res) => {
  users = await User.find();
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users
    }
  });
});
