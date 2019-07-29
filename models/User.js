const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	username: String,
	email: String,
	password: String,
	imgURL: String,
	spotify_token: String,
	friends: [String]
});

module.exports = User = mongoose.model("users", UserSchema);
