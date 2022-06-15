const mongoose = require('mongoose');
const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 1,
    maxlength: 30,
    required: true,
    unique: true,
  },
});

const genre = mongoose.model(genreSchema);
module.exports(genre);
