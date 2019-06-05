require ('dotenv').load ();
// Twilio Credentials
accountSid = process.env.TWILIO_ACCOUNT_SID;
authToken = process.env.TWILIO_AUTH_TOKEN;

// require the Twilio module and create a REST client
const client = require ('twilio') (accountSid, authToken);

console.log ('Vaatame, kas asjad on defineeritud üldse.');
console.log (process.env.TWILIO_ACCOUNT_SID);
console.log (process.env.TWILIO_AUTH_TOKEN);

// Aga palun!
// https://www.twilio.com/blog/2016/09/how-to-send-an-sms-with-node-js-using-twilio.html
// https://www.twilio.com/blog/2017/08/working-with-environment-variables-in-node-js.html

// Create and send message
client.messages.create (
  {
    to: process.env.MY_PHONE_NUMBER,
    from: process.env.TWILIO_PHONE_NUMBER,
    body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
  },
  (err, message) => {
    console.log (message.sid);
  }
);
