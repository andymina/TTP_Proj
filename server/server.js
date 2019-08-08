// Package imports
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');

// File imports
const keys = require('./config');
const RoomHandler = require('./RoomHandler');
const roomHandler = new RoomHandler();
module.exports = roomHandler;

// Variable declaration
const app = express();
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
require('./config/passport')(passport);
const port = process.env.PORT || 5000;
const server = app.listen(port, () => console.log(`Now listening on port ${port}!`));
const io = require('socket.io')(server);

// Socket handler
require('./socket')(io);

// API Routes
app.use("/api", require('./api'));

// Connect to MongoDB database
mongoose.connect(keys.MONGO_URI, { useNewUrlParser: true }).then(() => {
	console.log("Connected to database");
}).catch((err) => {
	console.log(err);
});
