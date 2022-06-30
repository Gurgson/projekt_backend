const mongoose = require('mongoose');
const trackSchema = new mongoose.Schema({
  name: {
    type: String,
    min: 1,
    maxlength: 50,
    required: true,
    trim: true
  },
  genreIds: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Genre',
    required: true
  },
  publisherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Publisher'
  },
  // UserId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'users',
  //   required: true,
  // },
  price: {
    type: Number,
    required: true,
    min: 1
  },
  dateAdded: {
    type: Date,
    required: true,
    max: Date.now(),
    default: Date.now()
  }
});

const Track = mongoose.model('Track', trackSchema);
module.exports = Track;
