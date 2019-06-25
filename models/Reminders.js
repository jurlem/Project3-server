require ('dotenv').config ();

const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const moment = require ('moment');
// reminders are defined in different time zones, we use Moment.js
// library in order to properly query every upcoming appointment
// considering its time zone.
const cfg = require ('../config');
const Twilio = require ('twilio');

const remindersSchema = new Schema (
  {
    date: Date,
    time: String,
    remindMe: String,
    notification: Number, //
    timeZone: String,
    text: String,
    gridRadios: String,
    userId: {type: Schema.Types.ObjectId, ref: 'User'}, // is it necessary here also  ?
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

remindersSchema.methods.requiresNotification = function (date) {
  return (
    Math.round (
      moment
        .duration (
          moment (this.time)
            .tz (this.timeZone)
            .utc ()
            .diff (moment (date).utc ())
        )
        .asMinutes ()
    ) === this.notification
  );
};

remindersSchema.statics.sendNotifications = function (callback) {
  // now
  const searchDate = new Date ();
  Reminders.find ().then (function (reminders) {
    reminders = reminders.filter (function (reminder) {
      return reminder.requiresNotification (searchDate);
    });
    if (reminders.length > 0) {
      sendNotifications (reminders);
    }
  });

  /**
    * Send messages to all reminder owners via Twilio
    * @param {array} reminders List of reminders.
    */
  function sendNotifications (reminders) {
    const client = new Twilio (cfg.twilioAccountSid, cfg.twilioAuthToken);
    reminders.forEach (function (reminder) {
      // Create options to send the message
      const options = {
        to: `+ ${reminder.phoneNumber}`,
        from: cfg.twilioPhoneNumber,
        /* eslint-disable max-len */
        body: `Hi ${reminder.name}. Just a reminder that you have an reminder coming up.`,
        /* eslint-enable max-len */
      };

      // Send the message!
      client.messages.create (options, function (err, response) {
        if (err) {
          // Just log it for now
          console.error (err);
        } else {
          // Log the last few digits of a phone number
          let masked = reminder.phoneNumber.substr (
            0,
            reminder.phoneNumber.length - 5
          );
          masked += '*****';
          console.log (`Message sent to ${masked}`);
        }
      });
    });

    // Don't wait on success/failure, just indicate all messages have been
    // queued for delivery
    if (callback) {
      callback.call ();
    }
  }
};

const Reminders = mongoose.model ('Reminders', remindersSchema);
module.exports = Reminders;
