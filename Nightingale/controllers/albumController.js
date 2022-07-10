const Album = require('./../models/albumModel');
const catchAsync = require('./../utils/catchAssync');
const APIfeatures = require('./../utils/APIfeatures');
exports.getAllAlbums = catchAsync(async (req, res) => {
  const features = new APIfeatures(Album.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const albums = await features.query;
  res.status(200).json({
    status: 'success',
    results: albums.length,
    data: {
      albums
    }
  });
});
exports.getAlbumById = catchAsync(async (req, res) => {
  const album = await Album.findById(req.params.id);
  res.status(200).json({
    status: 'success',
    data: {
      album
    }
  });
});
exports.addAlbum = catchAsync(async (req, res) => {
  const newAlbum = await Album.create(req.body);
  res.status(201).json({
    status: 'success',
    data: newAlbum
  });
});
exports.updateAlbum = catchAsync(async (req, res) => {
  const album = await Album.findByIdAndUpdate(
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
      album
    }
  });
});
exports.deleteAlbum = catchAsync(async (req, res) => {
  const album = await Album.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'success',
    data: null
  });
});
