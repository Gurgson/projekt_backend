const express = require('express');
const userController = require('./../controllers/userController');
const router = express.Router();

function template() {}

router
  .route('')
  .get(template)
  .post(template);

router
  .route('/:id')
  .get(template)
  .patch(template)
  .delete(template);

module.exports = router;
