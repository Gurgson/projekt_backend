const mongoose = require('mongoose');
const publisherSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
    required: [true, 'Publisher name must be specified'],
    unique: true,
    trim: true
  }
});

const Publisher = mongoose.model('Publisher', publisherSchema);

module.exports = Publisher;
