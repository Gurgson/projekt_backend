const mongoose = require('mongoose');
const albumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  trackIds: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'tracks'
  },
  priceModifier: {
    type: Number,
    default: 1,
    min: 1,
    max: 70
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});
const album = mongoose.model(albumSchema);
module.exports(album);
