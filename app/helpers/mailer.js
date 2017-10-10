require('dotenv').config();
var nodemailer = require('nodemailer');

var mailer = nodemailer.createTransport ({
  sendmail: true,
  newline: 'unix',
  path: '/usr/sbin/sendmail'
});

module.exports = mailer;
