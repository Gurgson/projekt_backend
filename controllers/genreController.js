const Genre = require('./../models/genreModel');
const catchAssync = require('./../utils/catchAssync');
exports.getAllGenres = catchAssync(async (req, res) => {
  const genres = await Genre.find();
  res.status(200).json({
    status: 'success',
    results: genres.length,
    data: {
      genres
    }
  });
});
exports.getGenreGenreById = catchAssync(async (req, res) => {
  const genres = await Genre.findById(req.params.id);
  res.status(200).json({
    status: 'success',
    data: {
      genres
    }
  });
});

exports.addGenre = catchAssync(async (req, res) => {
  const genres = await Genre.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      genres
    }
  });
});
exports.updateGenre = catchAssync(async (req, res) => {
  const genres = await Genre.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  res.status(201).json({
    status: 'success',
    data: {
      genres: genres
    }
  });
});
exports.deleteGenre = catchAssync(async (req, res) => {
  const genres = await Genre.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'success',
    data: null
  });
});
