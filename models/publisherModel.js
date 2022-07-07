const mongoose = require('mongoose');
const publisherSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: [50, 'A publisher name must have less or equal 50 characterss'],
    required: [true, 'A publisher name must be specified'],
    unique: true,
    trim: true
  }
});

const Publisher = mongoose.model('Publisher', publisherSchema);

module.exports = Publisher;
