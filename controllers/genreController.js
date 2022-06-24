const Genre = require('./../models/genreModel');

exports.getAllGenres = async (req, res) => {
  try {
    const genres = await Genre.find();
    res.status(200).json({
      status: 'success',
      results: genres.length,
      data: {
        genres
      }
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error
    });
  }
};
exports.getGenreGenreById = async (req, res) => {
  try {
    const genres = await Genre.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      results: genres.length,
      data: {
        genres
      }
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error
    });
  }
};

exports.addGenre = async (req, res) => {
  try {
    const genres = await Genre.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        genres
      }
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error
    });
  }
};
exports.updateGenre = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error
    });
  }
};
exports.deleteGenre = async (req, res) => {
  try {
    const genres = await Genre.findByIdAndDelete(req.params.id);
    res.status(201).json({
      status: 'success',
      data: {
        genres
      }
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error
    });
  }
};
