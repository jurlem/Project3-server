// Twilio Credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

// require the Twilio module and create a REST client
const client = require ('twilio') (accountSid, authToken);

client.messages.create (
  {
    to: '+31651238929',
    from: '+3197014201928',
    body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
  },
  (err, message) => {
    console.log (message.sid);
  }
);
