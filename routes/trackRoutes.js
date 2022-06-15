const express = require('express');
const trackController = require('./../controllers/trackController');
const router = express.Router();

//placeholder
function placeholderforcontroller() {}

router
  .route('')
  .get(placeholderforcontroller)
  .post(placeholderforcontroller);

router
  .route('/:id')
  .get(placeholderforcontroller)
  .patch(placeholderforcontroller)
  .delete(placeholderforcontroller);

module.exports = router;
