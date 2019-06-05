// create a server that can handle incoming messages:

// ngrok:
//Authtoken saved to configuration file: /Users/Merle/.ngrok2/ngrok.yml
// sudo cp ngrok /usr/local/bin

// Kasuta const-i siin, siis ei saa keegi muutujaid üle sodida.
const http = require ('http');
const express = require ('express');
const twilio = require ('twilio');

const app = express ();

app.post ('/sms', function (req, res) {
  // Error on, et TwimlResponse is not a constructor. Let me see
  const twiml = new twilio.twiml.MessagingResponse ();
  twiml.message ('The Robots are coming! Head for the hills!');
  res.writeHead (200, {'Content-Type': 'text/xml'});
  res.end (twiml.toString ());
});

http.createServer (app).listen (1337, function () {
  console.log ('Express server listening on port 1337');
});
