const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	username: String,
	email: String,
	password: String,
	imgURL: String,
	spotify_token: String,
	friends: [String],
	online_status: Boolean
});

module.exports = User = mongoose.model("users", UserSchema);
