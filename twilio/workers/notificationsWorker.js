'use strict';

const Reminders = require ('../models/reminders');

const notificationWorkerFactory = function () {
  return {
    run: function () {
      Reminders.sendNotifications ();
    },
  };
};

module.exports = notificationWorkerFactory ();
