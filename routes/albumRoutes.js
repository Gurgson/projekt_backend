const express = require('express');
const albumController = require('./../controllers/albumController');
const router = express.Router();

function template() {}

router.route('').post(template);

router.route('/:id').get(template).patch(template).delete(template);

module.exports = router;
