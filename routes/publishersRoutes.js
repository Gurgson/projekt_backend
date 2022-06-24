const express = require('express');
const publisherController = require('./../controllers/publisherController');
const router = express.Router();

function template() {}

router
  .route('')
  .get(publisherController.getAllPublishers)
  .post(publisherController.addPublisher);

router
  .route('/:id')
  .get(publisherController.getPublisherById)
  .patch(publisherController.updatePublisher)
  .delete(publisherController.deletePublisher);

module.exports = router;
