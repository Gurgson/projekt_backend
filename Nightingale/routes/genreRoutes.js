const express = require('express');
const genreController = require('./../controllers/genreController');
const router = express.Router();

//placeholder
function placeholderforcontroller() {}

router
  .route('/')
  .get(genreController.getAllGenres)
  .post(genreController.addGenre);

router
  .route('/:id')
  .get(genreController.getGenreGenreById)
  .patch(genreController.updateGenre)
  .delete(genreController.deleteGenre);

module.exports = router;
