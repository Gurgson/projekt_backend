const mongoose = require('mongoose');
const albumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  trackIds: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'tracks',
  },
  priceModifier: {
    type: Number,
    min: 1,
    max: 70,
  },
  creationDate: {
    type: Date,
    default: Date.now(),
    max: Date.now(),
  },
});
const user = mongoose.model(albumSchema);
module.exports(album);
