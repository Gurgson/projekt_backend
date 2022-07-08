const express = require('express');
const genreController = require('./../controllers/genreController');
const authController = require('./../controllers/authController');
const router = express.Router();

router
  .route('/')
  .get(genreController.getAllGenres)
  .post(
    authController.protect,
    authController.restrictTo('Admin'),
    genreController.addGenre
  );

router
  .route('/:id')
  .get(authController.protect, genreController.getGenreGenreById)
  .patch(
    authController.protect,
    authController.restrictTo('Admin'),
    genreController.updateGenre
  )
  .delete(
    authController.protect,
    authController.restrictTo('Admin'),
    genreController.deleteGenre
  );

module.exports = router;
