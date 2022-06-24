const mongoose = require('mongoose');
const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
    required: [true, 'Genre name is required'],
    unique: true,
    trim: true
  }
});

const genre = mongoose.model('Genre', genreSchema);
module.exports = genre;
