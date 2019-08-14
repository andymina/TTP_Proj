const Room = require('./Room');
class RoomHandler {
	constructor() {
		this.active_rooms = [];
	}

	isValidCode = (code) => {
		this.active_rooms.forEach((element) => {
			if (element.room_code == code) return false;
		});
		return true;
	}

	generateRoomCode = () => {
		const validChars = "ABCDEFGHIJKLMNPQRSTUVWXYZ1234567890";
		let code;

		do {
			code = "";

			for (let i = 0; i < 4; i++){
			const char = validChars[Math.floor(Math.random() * validChars.length)];
			code += char;
			}

			if (this.isValidCode(code)) return code;
		} while (!this.isValidCode(code));
	};

	getRoom = (code) => {
		for (let i = 0; i < this.active_rooms.length; i++)
			if (this.active_rooms[i].room_code == code)
				return this.active_rooms[i];

		return false;
	}

	createRoom = () => {
		const room_code = this.generateRoomCode();
		this.active_rooms.push(new Room(room_code));
		return room_code;
	};

	destroy = (room_code) => {
		let room = this.getRoom(room_code);
		room.unfollowPlaylist();
		this.active_rooms = this.active_rooms.filter((element) => element.room_code !== room_code);
	}
}

module.exports = RoomHandler;
