const Track = require('./../models/trackModel');

exports.getAllTracks = async (req, res) => {
  try {
    console.log(req);
    const tracks = await Track.find()
      .populate('publisherId')
      .populate('genreIds');

    res.status(200).json({
      status: 'success',
      results: tracks.length,
      data: {
        tracks
      }
    });
  } catch (error) {
    res.status(404).json({
      status: 'fails',
      message: error
    });
  }
};
exports.getTrackById = async (req, res) => {
  // console.log(req.params.id);
  try {
    const tracks = await Track.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        tracks
      }
    });
  } catch (error) {
    res.status(404).json({
      status: 'fails',
      message: error
    });
  }
};
exports.addTrack = async (req, res) => {
  console.log(req.body);
  try {
    const newTrack = await Track.create(req.body);
    res.status(201).json({
      status: 'success',
      data: newTrack
    });
  } catch (error) {
    console.log(error);
  }
};
exports.updateTrack = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error
    });
  }
};
exports.deleteTrack = async (req, res) => {
  try {
    const tracks = await Track.findByIdAndDelete(req.params.id);
    res.status(201).json({
      status: 'success',
      data: {
        tracks
      }
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error
    });
  }
};
