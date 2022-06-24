const album = require('./../models/albumModel');
exports.getAllAlbumsByUserId = async (req, res) => {
  try {
    const album = await Track.findById(req.body);
    res.status(200).json({
      status: 'success',
      results: album.length,
      data: {
        album
      }
    });
  } catch (error) {
    res.status(404).json({
      status: 'fails',
      message: error
    });
  }
};
exports.createAlbum = async (req, res) => {
  try {
    const newAlbum = await Track.create(req.body);
    res.status(201).json({
      status: 'success',
      data: newAlbum
    });
  } catch (error) {
    console.log(error);
  }
};
