require("dotenv").config();
const express = require('express')



//mailer
const nodemailer = require('nodemailer')
const cors = require('cors')



const request = require('request')
const bodyParser = require('body-parser'); // Middleware 
const app = express()
const connection = require("./db/connectdb");

//bcrypt
// const bcrypt = require("bcrypt");

// const pay = require("./routes/pay");
const { User } = require("./models/user");

//authentication
const authRoutes = require("./routes/auth");
const payRoutes = require("./routes/pay");


//variables
var email;
var password;

app.set('view engine', 'pug')

//authentication
app.use("/api/auth", authRoutes);
app.use("/api/pay", payRoutes);


app.use(express.json())
// app.use(express.static('./methods-public'))
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
  origin: "*"
}));

connection()

// app.use("/pay", pay);

// app.post('/login', async (req, res) => {
//   //   // Insert Login Code Here                    https://secure5.tranzila.com/cgi-bin/tranzila71u.cgi



//   try {
//     email = req.body.email
    
//     var contact = req.body.contact

//     var ccno = req.body.ccno
//     var myid = req.body.myid

//     var expdate = req.body.expdate

//     var mycvv = req.body.mycvv

//     const url = `https://secure5.tranzila.com/cgi-bin/tranzila71u.cgi?supplier=hrc28&tranmode=A&ccno=${ccno}&expdate=${expdate}&sum=1&currency=1&cred_type=1&myid=${myid}&mycvv=${mycvv}&TranzilaPW=GExfI6Yt&email=${email}&contact=${contact}`

//     request({ url: url }, (error, response) => {
//       const data = response.body
//       const tranzilaresponse = data.split('&')
//       if (tranzilaresponse[0] === 'Response=000') {
//         console.log('Yes, Yes');
//         if (email) {

//           password = generator.generate({
//             length: 10,
//             numbers: true
//           });
//           console.log(`password is ${password}`);
//           //bcrypt password
//           // const salt = bcrypt.genSalt(Number(process.env.SALT));
//           // const hashPassword = bcrypt.hash(password.toString(), salt);

//           //insert into DataBase
//           new User({ ...req.body, email, password }).save();
//           main()
//           res.redirect('/paymentaccepted.html');


//         }



//       }

//       else {
//         res.redirect('/paymenterror.html');
//       }
//     })
//   } catch (error) {
//     console.log(error)
//   }

// });

//send mail
async function main() {

  const nodemailer = require('nodemailer');

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'massahmed61@gmail.com',
      pass: 'xfihkooxnuqfdluc'
    }
  });

  send();

  async function send() {
    const result = await transporter.sendMail({
      from: 'massahmed61@gmail.com',
      to: 'massahmed61@gmail.com',
      subject: 'Hello World',
      text: `Hello There , your Email is : ${email} , Your Password is ${password}`
    });

    console.log(JSON.stringify(result, null, 4));
  }
}





// async function Addusers(req, res) {

//   await new User({ ...req.body, myid,sum }).save();
// }
const port = process.env.port || 5000
app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
})