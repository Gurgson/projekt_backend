const express = require('express');
const authController = require('./../controllers/authController');
const userController = require('./../controllers/userController');
const router = express.Router(authController.signup);

router.get(
  '/authentcateUserWithJWT/:jwt',
  authController.authenticateUser
);
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.patch(
  '/updateMyPasword',
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
  .route('')
  .get(authController.protect, userController.getAllUsers);
module.exports = router;
