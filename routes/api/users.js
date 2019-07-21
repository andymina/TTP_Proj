const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const validateLogin = require('../../validation/login');
const validateSignup = require('../../validation/signup');
const User = require('../../models/User');
const router = express.Router();

router.post("/signup", (req, res) => {
	console.log(req);
	const { errors, isValid } = validateSignup(req.body);
	if (!isValid) return res.status(400).json(errors);

	User.findOne({ email: req.body.email }).then((user) => {
		if (user) return res.status(400).json({ email: "Account with that email already found" });
		else {
			const newUser = new User({
				username: req.body.username,
				email: req.body.email,
				password: req.body.password
			});

			bcrypt.hash(newUser.password, 10, (err, hash) => {
				if (err) throw err;
				newUser.password = hash;
				newUser.save().then((user) => {
					res.status(200).json(user);
				}).catch((err) => {
					console.log(err);
				})
			});
		}
	})
});

router.post("/login", (req, res) => {
	const { errors, isValid } = validateLogin(req.body);
	if (!isValid) return res.status(400).json(errors);

	const email = req.body.email;
	const password = req.body.password;

	User.findOne({ email }).then((user) => {
		if (!user) return res.status(404).json({ email: "Account with that email not found" });

		bcrypt.compare(password, user.password).then((isMatch) => {
			if (isMatch){
				const payload = {
					id: user.id,
					username: user.username
				};

				jwt.sign(payload, keys.SECRET_OR_KEY, { expiresIn: 604800 }, (err, token) => {
					res.json({ success: true, token: "Bearer " + token });
				})
			} else {
				res.status(400).json({ password: "Incorrect password"});
			}
		});
	})
});

module.exports = router;
