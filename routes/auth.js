const router = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");
var moment = require('moment');
var now = moment();

router.post("/", async (req, res) => {
	try {

		// console.log(`line 9`);
		// console.log(req.query);
		const email = req.query.email
		const password = req.query.password
		


		
		const user = await User.findOne({ email });
		console.log(user);
		if (!user){
			
			return res.send(501).send({ message: "Email not found" });
		}
			

		//check timestamp
		const dateThen = new Date(user.timestamp);
		
		const dateNow = new Date();
		

		const differenceDates = dateNow.getTime() - dateThen.getTime();
		console.log(differenceDates);
			if (differenceDates > 82800000) {
				// await User.findOneAndDelete({email})
				console.log(`Will remove token`);
				return res.status(404).send({message: "Email not found"});
				
			}
			

		const validPassword = user.password == password ? 'Yes' : 'No'
		
		
		if (validPassword == 'No')
			return res.status(401).send({ message: "Invalid Email or Password" });
		else {
			
			const token = user.generateAuthToken();
			
			const time = user.timestamp;
			console.log(time);
			console.log('He can access');
			 return res.status(200).send({ data: `Bearer ${token}`, timestamp: time, message: "logged in successfully" });
		}

	} catch (error) {
		console.log(`Error`);
		 return res.status(500).send({ message: "Something was wrong" });
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


