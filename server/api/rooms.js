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

router.post("/join/:room_code", (req, res) => {
	// Get the data code that was passed
	const { room_code } = req.body;
	if (roomHandler.isValidCode(room_code)) return res.status(200).json({ isValid: true, error: "" });
	else return res.status(500).json({ isValid: false, error: "That room wasn't found. Please enter a valid room code and try again." })
});

module.exports = router;
