const validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLogin(data) {
	// Initialize errors object
	let errors = {};
	const passRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,30}$/;

	// Convert empty fields to an empty string so we can use validator functions
	data.email = !isEmpty(data.email) ? data.email : "";
	data.password = !isEmpty(data.password) ? data.password : "";

	// Email validation
	if (validator.isEmpty(data.email))
		errors.email = "Email field is required";
	else if (!validator.isEmail(data.email))
		errors.email = "Email is invalid";

	// Password validation
	if (validator.isEmpty(data.password))
		errors.password = "Password field is required";
	else if (!validator.isLength(data.password, {min: 6, max: 30}))
		errors.password = "Password must be at least 6 characters";
	else if (!passRegEx.test(data.password))
		errors.password = "Password must contain one uppercase letter, one lowercase letter, and one number";

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
