const express = require('express');
const trackController = require('./../controllers/trackController');
const authController = require('./../controllers/authController');
const router = express.Router();

//placeholder
function placeholderforcontroller() {}

router
  .route('')
  .get(trackController.getAllTracks)
  .post(authController.protect, trackController.addTrack);

router
  .route('/:id')
  .get(trackController.getTrackById)
  .patch(
    authController.protect,
    trackController.ifItsYours,
    trackController.updateTrack
  )
  .delete(
    authController.protect,
    trackController.ifItsYours,
    trackController.deleteTrack
  );

module.exports = router;
