const Track = require('./../models/trackModel');

exports.getAllTracks = async (req, res) => {
  try {
    const tracks = await Track.find();
    res.status(200).json({
      status: 'success',
      results: tracks.length,
      data: {
        tracks,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fails',
      message: error,
    });
  }
};
exports.AddTrack = async (req, res) => {
  try {
    const newTrack = await Track.create(req.body);
    res.status(201).json({
      status: 'success',
      data: newTrack,
    });
  } catch (error) {
    console.log(error);
  }
};
