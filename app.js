require ('dotenv').config ();

const bodyParser = require ('body-parser');
const cookieParser = require ('cookie-parser');
const express = require ('express');
const favicon = require ('serve-favicon');
const mongoose = require ('mongoose');
const logger = require ('morgan');
const path = require ('path');
const cors = require ('cors');

const session = require ('express-session');
const MongoStore = require ('connect-mongo') (session);
const flash = require ('connect-flash');

// import passport docs from config folder
const passportSetup = require ('./passport/serializers');

mongoose
  .connect ('mongodb://localhost/remindertool', {useNewUrlParser: true})
  .then (x => {
    console.log (
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch (err => {
    console.error ('Error connecting to mongo', err);
  });

const app_name = require ('./package.json').name;
const debug = require ('debug') (
  `${app_name}:${path.basename (__filename).split ('.')[0]}`
);

const app = express ();

// Middleware Setup
app.use (logger ('dev'));
app.use (bodyParser.json ());
app.use (bodyParser.urlencoded ({extended: false}));
app.use (cookieParser ());

// Express View engine setup

app.use (
  require ('node-sass-middleware') ({
    src: path.join (__dirname, 'public'),
    dest: path.join (__dirname, 'public'),
    sourceMap: true,
  })
);

app.set ('views', path.join (__dirname, 'views'));
app.set ('view engine', 'hbs');
app.use (express.static (path.join (__dirname, 'public')));
app.use (favicon (path.join (__dirname, 'public', 'images', 'favicon.ico')));

// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';

// Enable authentication using session + passport
app.use (
  session ({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {maxAge: 60 * 60000},
    store: new MongoStore ({
      mongooseConnection: mongoose.connection,
      ttl: 1 * 60 * 60,
    }),
  })
);
passportSetup (app);

app.use (flash ());
require ('./passport') (app);

// cors
app.use (
  cors ({
    origin: ['http://localhost:3000'],
    credentials: true,
  })
);

const index = require ('./routes/index');
app.use ('/', index);

const usersRoutes = require ('./routes/users');
app.use ('/users', usersRoutes);

const authRoutes = require ('./routes/auth');
app.use ('/auth', authRoutes);

const remindersRoutes = require ('./routes/reminders');
app.use ('/reminders', remindersRoutes);

const manageRoutes = require ('./routes/manage');
app.use ('/manage', manageRoutes);

module.exports = app;
