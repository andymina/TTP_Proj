const express = require('express');
const router = express.Router()
const keys = require('../config/keys');
const active_rooms = [];

const generateRoomCode = () => {
	const validChars = "ABCDEFGHIJKLMNPQRSTUVWXYZ1234567890";
	let code;

	do {
		code = "";

		for (let i = 0; i < 4; i++){
		const char = validChars[Math.floor(Math.random() * 35)];
		code += char;
		}

		if (!active_rooms.includes(code)) active_rooms.push(code);
	} while (!active_rooms.includes(code));

	return code;
};

router.get("/create", (req, res) => {
	// Generate the room code
	// Move into the new room on the server side
	// Return the new the URL
	const room_code = generateRoomCode();
	return res.status(200).json(room_code);
});

router.get("/join/:room_code", (req, res) => {
	const { room_code } = req.params;
	if (!active_rooms.includes(room_code))
		return res.status(404).json("Room not found. Please enter a valid room code.");

	// STUCK
	return res.status(200).json(req.params);
});

module.exports = router;
