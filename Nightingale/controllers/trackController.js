const Track = require('./../models/trackModel');
const catchAsync = require('./../utils/catchAssync');

exports.getAllTracks = catchAsync(async (req, res) => {
  const tracks = await Track.find();

  res.status(200).json({
    status: 'success',
    results: tracks.length,
    data: {
      tracks
    }
  });
});
exports.getTrackById = catchAsync(async (req, res) => {
  console.log(req.params.id);
  const track = await Track.findById(req.params.id);
  res.status(200).json({
    status: 'success',
    data: {
      track
    }
  });
});
exports.addTrack = catchAsync(async (req, res) => {
  const newTrack = await Track.create(req.body);
  res.status(201).json({
    status: 'success',
    data: newTrack
  });
});
exports.updateTrack = catchAsync(async (req, res) => {
  const tracks = await Track.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
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
