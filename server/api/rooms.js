const express = require('express');
const router = express.Router()
const keys = require('../config');
const roomHandler = require('../server');

router.get("/list", (req, res) => {
	return res.status(200).json(roomHandler.active_rooms);
});

router.post("/create", (req, res) => {
	// create a new room
	const room_code = roomHandler.createRoom();

	// Return the room_code of the new room
	return res.status(200).json(room_code);
});

module.exports = router;
