const express = require('express');
const publisherController = require('./../controllers/publisherController');
const authController = require('./../controllers/authController');
const router = express.Router();

router
  .route('')
  .get(publisherController.getAllPublishers)
  .post(
    authController.protect,
    authController.restrictTo('Admin'),
    publisherController.addPublisher
  );

router
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictTo('Admin'),
    publisherController.getPublisherById
  )
  .patch(
    authController.protect,
    authController.restrictTo('Admin'),
    publisherController.updatePublisher
  )
  .delete(
    authController.protect,
    authController.restrictTo('Admin'),
    publisherController.deletePublisher
  );

module.exports = router;
