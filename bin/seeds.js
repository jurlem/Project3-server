// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require ('mongoose');
const bcrypt = require ('bcrypt');
const User = require ('../models/User');

const bcryptSalt = 10;

mongoose
  .connect (process.env.MONGO_URI, {useNewUrlParser: true})
  // .connect ('mongodb://localhost/remindertool', {useNewUrlParser: true})
  // remindertool_db
  .then (x => {
    console.log (
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch (err => {
    console.error ('Error connecting to mongo', err);
  });

let users = [
  // {
  //   typeOfUser: 'USER',
  //   first_name: '13',
  //   email_address: '13@13.ee',
  //   password: bcrypt.hashSync ('13', bcrypt.genSaltSync (bcryptSalt)),
  //   phone_number: '651238929',
  //   premium: 'No',
  // },
  {
    typeOfUser: 'ADMIN',
    first_name: 'merle',
    email_address: 'merlevanjanse@gmail.com',
    password: bcrypt.hashSync ('merle', bcrypt.genSaltSync (bcryptSalt)),
    phone_number: '651238929',
    premium: 'Yes',
  },
];

User.deleteMany ()
  .then (() => {
    return User.create (users);
  })
  .then (usersCreated => {
    console.log (`${usersCreated.length} users created with the following id:`);
    console.log (usersCreated.map (u => u._id));
  })
  .then (() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect ();
  })
  .catch (err => {
    mongoose.disconnect ();
    throw err;
  });
