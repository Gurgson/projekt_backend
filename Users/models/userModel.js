const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 25,
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String
  },
  password: {
    type: String,
    minlenth: 10
  },
  Email: {
    type: String,
    unique: true
  }
});

const user = mongoose.model(userSchema);
