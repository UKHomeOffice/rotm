'use strict';

const router = require('express').Router();

router.use('/api/image-upload', require('./mocks/image-upload'));

module.exports = router;
