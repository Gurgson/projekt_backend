const Track = require('./../models/trackModel');
const catchAsync = require('./../utils/catchAssync');
const APIfeatures = require('./../utils/APIfeatures');
const AppError = require('./../utils/appError');
exports.getAllTracks = catchAsync(async (req, res) => {
  const features = new APIfeatures(Track.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const tracks = await features.query;

  res.status(200).json({
    status: 'success',
    results: tracks.length,
    data: {
      tracks
    }
  });
});
exports.getTrackById = catchAsync(async (req, res) => {
  const track = await Track.findById(req.params.id);
  res.status(200).json({
    status: 'success',
    data: {
      track
    }
  });
});
exports.ifItsYours = catchAsync(async (req, res, next) => {
  const track = await Track.find({ UserId: req.params.id });
  if (track.userId == req.user._id || req.user.role == 'Admin') {
    next();
  } else {
    return next(
      new AppError("You don't have permissions to do that"),
      401
    );
  }
});
exports.addTrack = catchAsync(async (req, res) => {
  const newBody = req.body;
  newBody.userId = req.user._id;
  const newTrack = await Track.create(newBody);
  res.status(201).json({
    status: 'success',
    data: newTrack
  });
});
exports.updateTrack = catchAsync(async (req, res) => {
  const tracks = await Track.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );
  res.status(201).json({
    status: 'success',
    data: {
      tracks
    }
  });
});
exports.deleteTrack = catchAsync(async (req, res) => {
  const tracks = await Track.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'success',
    data: null
  });
});
