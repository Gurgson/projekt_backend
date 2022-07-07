const mongoose = require('mongoose');
const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: [50, 'A publisher name must have less or equal 50 characterss'],
    required: [true, 'Genre name is required'],
    unique: true,
    trim: true
  }
});

const Genre = mongoose.model('Genre', genreSchema);
module.exports = Genre;
