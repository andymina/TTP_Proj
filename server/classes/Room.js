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
		this.playlist = {};
		this.master = {};
		this.max = 4;
		this.is_playing = false;
	}

	initMaster(user){
		this.master = user;

		const url = `https://api.spotify.com/v1/users/${this.master.spotify_id}/playlists`;
		const params = {
			name: this.room_code,
			public: false,
			collaborative: true,
			description: "Room created by MusiqU"
		};
		const header = {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + this.master.spotify_access_token
			}
		};

		axios.post(url, params, header).then((response) => {
			this.playlist.owner = this.master;
			this.playlist.id = response.data.id;
			this.playlist.uri = response.data.uri;
			// Playlist object
			console.log(response.data);
		}).catch((err) => {
			console.log(err);
		});
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

			if (this.current_users.length == 0) await this.initMaster(user);
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
	enqueue(user, song){
		const url = `https://api.spotify.com/v1/playlists/${this.playlist.id}/tracks`;
		const params = {
			uris: [song.uri]
		};
		const header = {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + user.spotify_access_token
			}
		};

		axios.post(url, params, header).then(() => {
			this.queue.push(song)
		}).catch((err) => {
			console.log(err);
		});
	}

	// Handle dequeue
	dequeue(){
		return this.queue.shift();
	}

	async play(song){
		const url = "https://api.spotify.com/v1/me/player/play";
		const params = { context_uri: this.playlist.uri };
		const header = {
			headers: {
				'Authorization': 'Bearer ' + this.master.spotify_access_token
			}
		};

		try {
			await axios.put(url, params, header);
			this.is_playing = true;
			this.song = song;
			return true;
		} catch(err) {
			console.log(err);
			return false;
		}
	}

	unfollowPlaylist(){
		const url = `https://api.spotify.com/v1/playlists/${this.playlist.id}/followers`;
		const header = {
			headers: {
				'Authorization': 'Bearer ' + this.playlist.owner.spotify_access_token
			}
		};

		axios.delete(url, header).catch((err) => {
			console.log(err);
		});
	}

	// Functions to implement
	// promote(user) - promotes the user passed to music master
}

module.exports = Room;
