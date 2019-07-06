// create a server that can handle incoming messages:

// ngrok:
//1)käivita  ngrok : ngrok http 1337
//2) muuda ngrok aadress: https://www.twilio.com/console/phone-numbers/PN058592851a94831cd646a4b44c6a1437,
// https://39c7db26.ngrok.io/sms
//3) käivita server node twilio/server.js

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

// create a server that can handle incoming messages:

// ngrok:
//Authtoken saved to configuration file: /Users/Merle/.ngrok2/ngrok.yml
// sudo cp ngrok /usr/local/bin

// Kasuta const-i siin, siis ei saa keegi muutujaid üle sodida.
// const http = require ('http');
// const express = require ('express');
// const twilio = require ('twilio');

// const app = express ();

// app.post ('/sms', function (req, res) {
//   var twilio = require ('twilio');
//   const twiml = new twilio.twiml.MessagingResponse ();
//   twiml.message ('The Robots are coming! Head for the hills!');
//   res.writeHead (200, {'Content-Type': 'text/xml'});
//   res.end (twiml.toString ());
// });

// app.post ('/sms', function (req, res) {
//   var twilio = require ('twilio');
//   // Error on, et TwimlResponse is not a constructor. Let me see
//   const twiml = new twilio.twiml.MessagingResponse ();
//   twiml.message ('The Robots are coming! Head for the hills!');
//   // if (req.body.Body == 'Delay 1D') {
//   //   twiml.message ('The message is delayed for 1 day');
//   // } else if (req.body.Body == 'Delay 1W') {
//   //   twiml.message ('The message is delayed for 1 day');
//   // } else {
//   //   twiml.message (
//   //     'Not sure what do you mean? Type: Delay 1D or Delay 1W for delaying reminder 1 day or 1 week'
//   //   );
//   // }
//   res.writeHead (200, {'Content-Type': 'text/xml'});
//   res.end (twiml.toString ());
// });

//
//  ********************************************'
// see all ei funka millegipärast:

// var http = require ('http'),
//   express = require ('express'),
//   twilio = require ('twilio'),
//   bodyParser = require ('body-parser');

// var app = express ();
// app.use (bodyParser.urlencoded ({extended: true}));

// app.post ('/', function (req, res) {
//   var twilio = require ('twilio');
//   // var twiml = new twilio.TwimlResponse ();
//   const twiml = new twilio.twiml.MessagingResponse ();

//   if (req.body.Body == 'hello') {
//     twiml.message ('Hi!');
//   } else if (req.body.Body == 'bye') {
//     twiml.message ('Goodbye');
//   } else {
//     twiml.message (
//       'No Body param match, Twilio sends this in the request to your server.'
//     );
//   }
//   res.writeHead (200, {'Content-Type': 'text/xml'});
//   res.end (twiml.toString ());
// });

// http.createServer (app).listen (1337, function () {
//   console.log ('Express server listening on port 1337');
// });
