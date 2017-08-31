require('dotenv').config();
var nodemailer = require('nodemailer');

var mailer = nodemailer.createTransport ({
  service: 'Gmail',
  auth: {
    user: process.env.MAILER_EMAIL,
    pass: process.env.MAILER_PASS
  }
});

module.exports = mailer;
