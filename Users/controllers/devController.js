const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAssync');
exports.becomeAdministrator = catchAsync(async (req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    next(
      new AppError(
        `Can't find ${req.originalUrl} on this server!, 404)`
      )
    );
  }
  const user = await User.findByIdAndUpdate(
    req.body.userId,
    { role: 'Admin' },
    {
      new: true,
      runValidators: true
    }
  ).select('-_id name email role');
  console.log(user);
  res.status(200).json({
    status: 'success',
    data: { user }
  });
});
