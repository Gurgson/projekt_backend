const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  Username: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 25,
    unique: true,
  },
});

const user = mongoose.model(userSchema);
