const express = require('express');
const albumController = require('./../controllers/albumController');
const authController = require('./../controllers/authController');
const router = express.Router();

router
  .route('')
  .get(albumController.getAllAlbums)
  .post(authController.protect, albumController.addAlbum);

router
  .route('/:id')
  .get(albumController.getAlbumById)
  .patch(authController.protect, albumController.updateAlbum)
  .delete(authController.protect, albumController.deleteAlbum);

module.exports = router;
