const active_rooms = [];

const isValidCode = (code) => {
	active_rooms.forEach((element) => {
		if (element.room_code == code) return false;
	});
	return true;
}
const generateRoomCode = () => {
	const validChars = "ABCDEFGHIJKLMNPQRSTUVWXYZ1234567890";
	let code;

	do {
		code = "";

		for (let i = 0; i < 4; i++){
		const char = validChars[Math.floor(Math.random() * 35)];
		code += char;
		}

		if (isValidCode(code)) return code;
	} while (!isValidCode(code));
};
const getRoom = (code) => {
	let room;
	active_rooms.forEach((element) => {
		if (element.room_code === code) room = element;
	})

	return room;
}

const createRoom = () => {
	const room_code = generateRoomCode();
	active_rooms.push(new Room(room_code));
	return room_code;
};

class Room {
	// Makes a room object
	// @param room_code: a string that represents the code to join
	// @param user: the user that creates the room
	constructor(room_code){
		this.room_code = room_code;
		this.current_users = [];
		this.max = 4;
		this.active = true;
	}

	join(user){
		// Check if the room is full.
		// If it is, then reject the current user.
		// If it's not, then add the current user to the room.
		if (this.current_users.length === this.max){
			return false;
		} else {
			if (this.current_users.length === 0) this.master = user;
			this.current_users.push(user);
			return true;
		}
	}

	leave(user){
		// Handle user leave
		if (this.current_users.length == 1){
			this.current_users = this.current_users.filter((element) => element !== user);
			this.active = false;
			console.log(`Destroy room ${this.room_code}`);
		} else {
			this.current_users = this.current_users.filter((element) => element !== user);
			console.log(`${user.username} has left room ${this.room_code}`);
		}
	}

	// Functions to implement
	// promote(user) - promotes the user passed to music master
}

module.exports = {
	Room: Room,
	createRoom: createRoom,
	active_rooms: active_rooms,
	isValidCode: isValidCode,
	generateRoomCode: generateRoomCode,
	getRoom: getRoom
};
