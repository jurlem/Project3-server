// Twilio Credentials

// require the Twilio module and create a REST client
// const client = require ('twilio') (accountSid, authToken);
require ('dotenv').load ();

console.log ('Vaatame, kas asjad on defineeritud üldse.');
console.log (process.env.TWILIO_ACCOUNT_SID);
console.log (process.env.TWILIO_AUTH_TOKEN);

// Aga palun!
// https://www.twilio.com/blog/2016/09/how-to-send-an-sms-with-node-js-using-twilio.html
// https://www.twilio.com/blog/2017/08/working-with-environment-variables-in-node-js.html
const client = require ('twilio') (
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Create and send message
client.messages.create (
  {
    to: process.env.MY_PHONE_NUMBER,
    from: '+3197014201928',
    body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
  },
  (err, message) => {
    console.log (message.sid);
  }
);
