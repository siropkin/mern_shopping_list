const mongoose = require('mongoose');
const { Schema } = mongoose;

const ItemSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Item name required.'],
    trim: true
  },
  add_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Item = mongoose.model('Item', ItemSchema);
