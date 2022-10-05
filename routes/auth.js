const router = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");

router.post("/", async (req, res) => {
	try {

		// console.log(`line 9`);
		// console.log(req.query);
		const email = req.query.email
		const password = req.query.password
		


		
		const user = await User.findOne({ email });
		
		if (!user)
			return res.status(401).send({ message: "Invalid Email or Password" });

		

		const validPassword = user.password == password ? 'Yes' : 'No'

		
		if (validPassword == 'No')
			return res.status(401).send({ message: "Invalid Email or Password" });
		else {
			const token = user.generateAuthToken();
			
			const time = user.timestamp;
			console.log(time);
			res.status(200).send({ data: token, timestamp: time, message: "logged in successfully" });
		}

	} catch (error) {
		console.log(`Error`);
		res.status(500).send({ message: "Invalid Email or Password" });
	}
});

const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = router;


