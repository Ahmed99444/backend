const router = require("express").Router();
const { User } = require("../models/user");
const request = require('request')
var generator = require('generate-password');


var email =''
var password =''

router.post("/", async (req, res) => {
    try {


        email = req.query.email
        const contact = req.query.contact
        const ccno = req.query.ccno
        const myid = req.query.myid
        const expdate = req.query.expdate
        const ccv = req.query.ccv

        console.log(`email ${email},contact ${contact},ccno ${ccno},myid ${myid},expdate ${expdate},ccv ${ccv}`)
        const url = `https://secure5.tranzila.com/cgi-bin/tranzila71u.cgi?supplier=hrc28&tranmode=A&ccno=${ccno}&expdate=${expdate}&sum=1&currency=1&cred_type=1&myid=${myid}&mycvv=${ccv}&TranzilaPW=GExfI6Yt&email=${email}&contact=${contact}`

        request({ url: url }, (error, response) => {
            const data = response.body
            const tranzilaresponse = data.split('&')
            if (tranzilaresponse[0] === 'Response=000') {
                console.log('Yes, Yes');
                if (email) {

                    password = generator.generate({
                        length: 10,
                        numbers: true
                    });
                    console.log(`password is ${password}`);
                    //bcrypt password
                    // const salt = bcrypt.genSalt(Number(process.env.SALT));
                    // const hashPassword = bcrypt.hash(password.toString(), salt);

                    //insert into DataBase
                    new User({ ...req.body, email, password }).save();

                    res.status(200).json({message:'Payment Accepted'})


                }



            }

            else {
                console.log(`Payment didn't accepted`);
                res.status(404).json({message:'אחד או יותר מהפרטים אינם נכונים'})
            }
        })
    }
    catch (error) {
        console.log(error);
        res.status(404).json({status:'Server internal Error'})
    }

})

module.exports = router;


