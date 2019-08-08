class Room {
	// Makes a room object
	// @param room_code: a string that represents the code to join
	// @param user: the user that creates the room
	constructor(room_code){
		this.room_code = room_code;
		this.queue = [];
		this.current_users = [];
		this.max = 4;
	}

	join(user){
		// Check if the room is full.
		// If it is, then reject the current user.
		// If it's not, then add the current user to the room.
		if (this.current_users.length !== this.max){
			if (this.current_users.length === 0) this.master = user;
			this.current_users.push(user);
			return true;
		} else {
			return false;
		}
	}


	// Handle user leave
	leave(user){
		this.current_users = this.current_users.filter((element) => element !== user);
	}

	enqueue(track){
		this.queue.push(track);
	}

	dequeue(){
		return this.queue.shift();
	}

	// Functions to implement
	// promote(user) - promotes the user passed to music master
}

module.exports = Room;
