'use strict';

const router = require('express').Router();

router.use('/file', require('./mocks/image-upload'));

module.exports = router;
