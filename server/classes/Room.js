const axios = require('axios');
const querystring = require('querystring');
const keys = require('../config');

class Room {
	// Makes a room object
	// @param room_code: a string that represents the code to join
	// @param user: the user that creates the room
	constructor(room_code){
		this.room_code = room_code;
		this.queue = [];
		this.current_users = [];
		this.song = {};
		this.max = 4;
	}

	// Handle user join
	async join(user){
		// Return false if the room is full
		if (this.current_users.length === this.max) return false;

		// Force the user to get a new token
		const url = "https://accounts.spotify.com/api/token";
		const params = querystring.stringify({
			refresh_token: user.spotify_refresh_token,
			grant_type: 'refresh_token'
		});
		const header = {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Authorization': 'Basic ' + keys.SPOTIFY_API_TOKEN
			}
		};

		try {
			const { data } = await axios.post(url, params, header);
			user.spotify_exp = Math.floor(Date.now() / 1000);
			user.spotify_access_token = data.access_token;

			if (this.current_users.length == 0) this.master = user;
			this.current_users.push(user);

			return true;
		} catch(err) {
			console.log(err);
			return false;
		}

	}

	// Handle user leave
	leave(user){
		this.current_users = this.current_users.filter((element) => element !== user);
	}

	// Handle enqueue
	enqueue(track){
		this.queue.push(track);
	}

	// Handle dequeue
	dequeue(){
		return this.queue.shift();
	}

	// Functions to implement
	// promote(user) - promotes the user passed to music master
}

module.exports = Room;
