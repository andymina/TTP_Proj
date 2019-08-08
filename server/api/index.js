const express = require('express');
const rooms = require('./rooms');
const users = require('./users');
const spotify = require('./spotify');
const router = express.Router();

router.use('/users', users);
router.use('/rooms', rooms);
router.use('/spotify', spotify);

module.exports = router;
