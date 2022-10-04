const path = require('path')
var nodemailer = require('nodemailer');
var hbs = require('nodemailer-express-handlebars');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'massahmed61@gmail.com',
    pass: 'Ahmedm994!'
  }
});

// const handlebarOptions = {
//   viewEngine: {
//     extName: ".handlebars",
//     partialsDir: path.resolve('./views'),
//     defaultLayout: false,
//   },
//   viewPath: path.resolve('./views'),
//   extName: ".handlebars",
// }

transporter.use('compile');

var mailOptions = {
  from: 'massahmed61@gmail.com',
  to: "pro1@riseandgrow.media",
  subject: 'Sending Email using Node.js',
  template: 'email',
  context: {
    title: 'Title Here',
    text: "Lorem ipsum dolor sit amet, consectetur..."
  }

};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});