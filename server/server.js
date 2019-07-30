// Package imports
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');

// File imports
const keys = require('./config/keys');
const api = require('./api')


// Variable declaration
const app = express();
const port = process.env.PORT || 5000;
const server = app.listen(port, () => console.log(`Now listening on port ${port}!`));
const io = require('socket.io')(server);

// Socket handler
require('./socket')(io);

// Initialize and use middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
require('./config/passport')(passport);

// API Routes
app.use("/api", api);

// Connect to MongoDB database
mongoose.connect(keys.MONGO_URI, { useNewUrlParser: true }).then(() => {
	console.log("Connected to database");
}).catch((err) => {
	console.log(err);
});
