require ('dotenv').load ();
// Twilio Credentials
accountSid = process.env.TWILIO_ACCOUNT_SID;
authToken = process.env.TWILIO_AUTH_TOKEN;

const mongoose = require ('mongoose');
const User = require ('../models/User');
const Reminders = require ('../models/Reminders');
const client = require ('twilio') (accountSid, authToken);
const moment = require ('moment');

//connects to DB AS SEEDFILE
mongoose
  .connect (process.env.MONGO_URI, {useNewUrlParser: true})
  .then (x => {
    console.log (
      `Connected to SENDING SMS MONGO script! Database name: "${x.connections[0].name}"`
    );
  })
  .catch (err => {
    console.error ('Error connecting to mongo', err);
  });

//MAKE A QUERY with  date
//GET  TODAY's reminders per user:

const today = moment ().startOf ('day');
// date = new Date ('2019-07-05T07:00:00.000+00:00');

Reminders.find ({
  // date: new Date (),
  date: {
    $gte: today.startOf ('day'),
    $lte: moment (today).endOf ('day').toDate (),
  },
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
              console.log (
                'Showing errors:',
                err,
                'Sent message SID:',
                message.sid
              );
            }
          );
        }
      }
      //end of map
    );
  });

// console.log (receivedReminders);
//log if message is delivered
