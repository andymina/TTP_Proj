const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	username: String,
	email: String,
	password: String,
	imgURL: String,
	spotify_access_token: String,
	spotify_refresh_token: String,
	spotify_exp: Number,
	friends: [String]
});

module.exports = User = mongoose.model("users", UserSchema);
