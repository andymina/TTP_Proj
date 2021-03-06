const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const keys = require('./index');

const options = {
	secretOrKey: keys.SECRET_OR_KEY,
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

module.exports = (passport) => {
	passport.use(
		new JwtStrategy(options, (payload, done) => {
			User.findById(payload.id).then((user) => {
				if (user) return done(null, user);
				else return done(null, false);
			}).catch((err) => {
				console.log(err);
			});
		})
	)
};
