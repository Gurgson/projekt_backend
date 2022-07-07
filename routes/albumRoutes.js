const express = require('express');
const albumController = require('./../controllers/albumController');
const router = express.Router();

router
  .route('')
  .get(albumController.getAllAlbums)
  .post(albumController.addAlbum);

router
  .route('/:id')
  .get(albumController.getAlbumById)
  .patch(albumController.updateAlbum)
  .delete(albumController.deleteAlbum);

module.exports = router;
