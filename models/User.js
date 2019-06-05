const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema (
  {
    username: String,
    email: String,
    phoneNumber: String,
    password: String,
    premium: Boolean,
    notification: {type: String, enum: ['MAIL', 'SMS'], default: 'MAIL'},
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
