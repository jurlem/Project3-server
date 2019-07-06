const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema (
  {
    first_name: String,
    email_address: String,
    phone_number: String,
    password: String,
    premium: {type: String, enum: ['Yes', 'No'], default: 'No'},
    notification: {type: String, enum: ['MAIL', 'SMS']},
    typeOfUser: {type: String, enum: ['ADMIN', 'USER'], default: 'USER'},
    selectedDay: Date,
    // remindersId: {type: Schema.Types.ObjectId, ref: 'Reminders'},
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

const User = mongoose.model ('User', userSchema);
module.exports = User;
