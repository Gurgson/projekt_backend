const express = require('express');
const devController = require('./../controllers/devController');
const router = express.Router();
router.route('/becomeAdmin').patch(devController.becomeAdministrator);
module.exports = router;
