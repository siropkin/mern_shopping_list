const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'User name required.'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email required.'],
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password required.']
  },
  register_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model('User', UserSchema);
