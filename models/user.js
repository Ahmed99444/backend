const mongoose = require("mongoose");
var moment = require('moment');
var now = moment();
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
	email: { type: String, required: true },
	// sum: { type: String, required: true },
	// email: { type: String, required: true },
	password: { type: String, required: true },
	timestamp: {type: String, default: now.format("YYYY-MM-DD HH:mm:ss")}
});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "1d",
	});
	return token;
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().required().label("myid"),
		// password: Joi.string().required().label("sum"),
		// email: Joi.string().email().required().label("Email"),
		// password: passwordComplexity().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = { User, validate };
// module.exports = { User };

