const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	username: String,
	email: String,
	password: String
});

module.exports = User = mongoose.model("users", UserSchema);
