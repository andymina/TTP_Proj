// Package imports
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');

// File imports
const users = require('./routes/api/users');
const keys = require('./config/keys');

// Variable declaration
const app = express();
const port = process.env.PORT || 5000;

// Initialize and use middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
require('./config/passport')(passport);

// Connect to MongoDB database
mongoose.connect(keys.MONGO_URI, { useNewUrlParser: true }).then(() => {
	console.log("Connected to database");
}).catch((err) => {
	console.log(err);
});

// Routes
app.use("/api/users", users);

app.listen(port, () => {
	console.log(`Now listening on port ${port}!`);
});
