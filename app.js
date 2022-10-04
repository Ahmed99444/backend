require("dotenv").config();
const express = require('express')

//mailer
const nodemailer = require('nodemailer')
const cors = require('cors')
const request = require('request')
const bodyParser = require('body-parser'); // Middleware 
const app = express()
const connection = require("./db/connectdb");
// const pay = require("./routes/pay");
const { User } = require("./models/user");

//generate random password
var generator = require('generate-password');


//variables
var email;
var password;




app.use(express.json())
app.use(express.static('./methods-public'))
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

connection()

// app.use("/pay", pay);

app.post('/login', async (req, res) => {
  //   // Insert Login Code Here                    https://secure5.tranzila.com/cgi-bin/tranzila71u.cgi



  try {
    email = req.body.email
    var contact = req.body.contact
    
    var ccno = req.body.ccno
    var myid = req.body.myid

    var expdate = req.body.expdate
    
    var mycvv = req.body.mycvv

    const url = `https://secure5.tranzila.com/cgi-bin/tranzila71u.cgi?supplier=hrc28&tranmode=A&ccno=${ccno}&expdate=${expdate}&sum=1&currency=1&cred_type=1&myid=${myid}&mycvv=${mycvv}&TranzilaPW=GExfI6Yt&email=${email}&contact=${contact}`

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
          new User({ ...req.body, email, password }).save();
          res.redirect('https://merkaz-client-2ycy-ahmed99444.vercel.app/login');
            

        }



      }
      else {
        console.log('Oh , No ~~!');
      }
    })
  } catch (error) {
    console.log(error)
  }

});

// async function Addusers(req, res) {

//   await new User({ ...req.body, myid,sum }).save();
// }

app.listen(5000, () => {
  console.log(`Server is listening on port 5000...`);
})