const mongoose = require('mongoose');
const trackSchema = new mongoose.Schema({
  name: {
    type: String,
    min: 1,
    maxlength: 30,
    required: true,
  },
  genreIds: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'genres',
    required: true,
  },
  publisherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'publishers',
  },
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 1,
  },
  dateAdded: {
    type: Date,
    required: true,
    max: Date.now(),
    default: Date.now(),
  },
});

const track = mongoose.model('Track', trackSchema);
module.exports = track;
