require ('dotenv').load ();
// Twilio Credentials
accountSid = process.env.TWILIO_ACCOUNT_SID;
authToken = process.env.TWILIO_AUTH_TOKEN;

const mongoose = require ('mongoose');
const User = require ('../models/User');
const Reminders = require ('../models/Reminders');
const client = require ('twilio') (accountSid, authToken);

//connects to DB AS SEEDFILE
mongoose
  .connect ('mongodb://localhost/remindertool', {useNewUrlParser: true})
  .then (x => {
    console.log (
      `Connected to SENDING SMS MONGO script! Database name: "${x.connections[0].name}"`
    );
  })
  .catch (err => {
    console.error ('Error connecting to mongo', err);
  });

//new Date - today
let todaysDate = new Date ();

//MAKE A QUERY with  date
//GET SELECTED DAY reminders per user:

let date = new Date ('2019-06-24T00:00:00.000+00:00');

Reminders.find ({
  date: date,
})
  .populate ('userId')
  .exec ((err, users) => {
    console.log (users);

    users.map (
      reminder => {
        if (reminder.gridRadios === 'sms') {
          client.messages.create (
            {
              to: reminder.userId.phone_number,
              from: process.env.TWILIO_PHONE_NUMBER,
              body: reminder.text,
            },
            (err, message) => {
              console.log (message.sid);
            }
          );
        }
      }
      //end of map
    );
  });

// console.log (receivedReminders);
//log if message is delivered
