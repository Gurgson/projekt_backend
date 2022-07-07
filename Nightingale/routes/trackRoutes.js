const express = require('express');
const trackController = require('./../controllers/trackController');
const router = express.Router();

//placeholder
function placeholderforcontroller() {}

router
  .route('')
  .get(trackController.getAllTracks)
  .post(trackController.addTrack);

router
  .route('/:id')
  .get(trackController.getTrackById)
  .patch(trackController.updateTrack)
  .delete(trackController.deleteTrack);

module.exports = router;
