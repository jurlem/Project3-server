'use strict';
require ('dotenv').load ();

const mongoose = require ('mongoose');
const express = require ('express');
// const router = express.Router ();
const Reminders = require ('../models/Reminders');
const User = require ('../models/User');
const nodemailer = require ('nodemailer');

//connects to DB AS SEEDFILE
mongoose
  .connect ('mongodb://localhost/remindertool', {useNewUrlParser: true})
  .then (x => {
    console.log (
      `Connected to SENDING EMAIL MONGO script! Database name: "${x.connections[0].name}"`
    );
  })
  .catch (err => {
    console.error ('Error connecting to mongo', err);
  });

// SMTP transporter
const transporter = nodemailer.createTransport ({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});

let date = new Date ('2019-07-02T16:00:00.000+00:00');

Reminders.find ({
  date: date,
})
  .populate ('userId')
  .exec ((err, users) => {
    console.log (users);

    users.map (
      reminder => {
        if (reminder.gridRadios === 'email') {
          transporter
            .sendMail ({
              from: '"New Reminder" <ReminderTool@oroject3.com>',
              to: reminder.userId.email_address,
              subject: 'Reminder',
              text: `${reminder.text}`,
              // html: nodemailer.email_template (message),
            })
            .then (info => console.log (info))
            .catch (error => console.log (error));
        }
      }
      //end of map
    );
  });

// *****************************''
// "use strict";
// const nodemailer = require("nodemailer");

// // async..await is not allowed in global scope, must use a wrapper
// async function main(){

//   // Generate test SMTP service account from ethereal.email
//   // Only needed if you don't have a real mail account for testing
//   let testAccount = await nodemailer.createTestAccount();

//   // create reusable transporter object using the default SMTP transport
//   let transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: testAccount.user, // generated ethereal user
//       pass: testAccount.pass // generated ethereal password
//     }
//   });

//   // send mail with defined transport object
//   let info = await transporter.sendMail({
//     from: '"Fred Foo 👻" <foo@example.com>', // sender address
//     to: "bar@example.com, baz@example.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>" // html body
//   });

//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//   // Preview only available when sending through an Ethereal account
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// }

// main().catch(console.error);

// JORG EXAMPLE
// https://github.com/IronhackAMSpt/module2day12/blob/master/routes/message.js

// const express = require('express');
// const router  = express.Router();
// const Message = require('../models/message');

// const nodemailer = require('nodemailer')

// const transport = nodemailer.createTransport({
//   service: "Gmail",
//   auth: {
//     user: process.env.EMAILUSER,
//     password: process.env.EMAILPASS
//   }
// })

// // GET /message/all
// router.get('/all', (req, res, next) => {
//   Message.find({})
//     .then(messages => {
//       res.send(messages);
//     })
//     .catch(err => {
//       console.log(err)
//     })
// });

// // POST /message/add
// router.post('/add', (req, res) => {
//   Message.create({
//     title: req.body.title,
//     body: req.body.body
//   })
//   .then(message => {
//     transport.sendMail({
//       from: "no-reply <no-reply@ironhack.com>",
//       to: "jorg.vanderham@ironhack.com",
//       subject: "the subject",
//       text: `a new message has been posted: ${message}`
//     })
//     res.send(message)
//   })
//   .catch(err => {
//     console.log(err);
//   })

// })
