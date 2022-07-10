const mongoose = require('mongoose');
const albumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'An album name has to be specified'],
    trim: true
  },
  trackIds: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Track'
  },
  priceModifier: {
    type: Number,
    default: 1,
    min: [1, 'Discount cannot be less then 1%'],
    max: [75, 'Discount cannot be greater then 75%']
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: [true, 'Creation date has to be specified']
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'You must be logged in']
  }
});
albumSchema.pre(/^find/, function (next) {
  this.populate('trackIds');
  next();
});
const Album = mongoose.model('Album', albumSchema);
module.exports = Album;
