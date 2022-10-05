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
		// const {email,password} = emailandpassword
		// console.log(email, password);
		// if (!emailandpassword){
		// 	console.log(`Error`);
		// 	return res.status(400).send({ message: error.details[0].message });
		// }


		console.log(`line 19`);
		const user = await User.findOne({ email });
		// console.log(user);
		if (!user)
			return res.status(401).send({ message: "Invalid Email or Password" });

		// const validPassword = await bcrypt.compare(
		// 	req.body.password,
		// 	user.password
		// );

		const validPassword = user.password == password ? 'Yes' : 'No'

		// console.log(validPassword)
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


