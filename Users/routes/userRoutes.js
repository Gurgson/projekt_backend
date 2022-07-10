const express = require('express');
const authController = require('./../controllers/authController');
const userController = require('./../controllers/userController');
const router = express.Router();

router.get(
  '/authentcateUserWithJWT/:jwt',
  authController.authenticateUser
);
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.patch(
  '/updateMyPassword',
  authController.protect,
  authController.updatePassword
);
router.patch(
  '/updateMyAccount',
  authController.protect,
  userController.updateMe
);
router.delete(
  '/deleteMe',
  authController.protect,
  userController.delteteMe
);
router
  .route('/cms/')
  .get(
    authController.protect,
    authController.restrictTo('Admin'),
    userController.getAllUsers
  );
router
  .route('/cms/:id')
  .get(
    authController.protect,
    authController.restrictTo('Admin'),
    userController.getUserById
  )
  .patch(
    authController.protect,
    authController.restrictTo('Admin'),
    userController.updateUser
  )
  .delete(
    authController.protect,
    authController.restrictTo('Admin'),
    userController.deleteUser
  );
module.exports = router;
