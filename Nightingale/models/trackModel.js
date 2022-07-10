const mongoose = require('mongoose');
const AppError = require('./../utils/appError');
const trackSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
    required: [true, 'A track name must be specified'],
    trim: true
  },
  genreIds: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Genre',
    required: [true, 'A track genre(s) must be specified']
  },
  publisherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Publisher'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'You must be logged in']
  },
  price: {
    type: Number,
    required: [true, 'A track price must be specified'],
    min: [1, 'Minimal price is 1']
  },
  dateAdded: {
    type: Date,
    required: true,
    max: [Date.now(), 'You cannot specify future date'],
    default: Date.now()
  }
});
trackSchema.pre(/^find/, function (next) {
  this.populate('genreIds');
  this.populate('publisherId');

  next();
});
const Track = mongoose.model('Track', trackSchema);
module.exports = Track;
