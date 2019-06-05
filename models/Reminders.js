const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const remindersSchema = new Schema (
  {
    date: String,
    time: String,
    reminderTime: String,
    text: String,
    userId: {type: Schema.Types.ObjectId, ref: 'User'}, // is it necessary here also  ?
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

const Reminders = mongoose.model ('Reminders', remindersSchema);
module.exports = Reminders;
