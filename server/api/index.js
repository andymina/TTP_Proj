const express = require('express');
const rooms = require('./rooms');
const users = require('./users');
const router = express.Router();

router.use('/users', users);
router.use('/rooms', rooms);

module.exports = router;
