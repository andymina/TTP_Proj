const express = require('express');
const router = express.Router()
const keys = require('../config/keys');
const RoomHandler = require('../RoomHandler');

router.get("/list", (req, res) => {
	return res.status(200).json(RoomHandler.active_rooms);
});

router.post("/create", (req, res) => {
	// create a new room
	const room_code = RoomHandler.createRoom();

	// Return the room_code of the new room
	return res.status(200).json(room_code);
});

router.post("/join/:room_code", (req, res) => {
	// Get the data code that was passed
	const { room_code } = req.body;
	if (RoomHandler.isValidCode(room_code)) return res.status(200).json({ isValid: true, error: "" });
	else return res.status(500).json({ isValid: false, error: "That room wasn't found. Please enter a valid room code and try again." })
});

module.exports = router;
