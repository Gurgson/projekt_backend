const mongoose = require('mongoose');
const publisherSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 1,
    maxlength: 30,
    required: true,
    unique: true,
  },
});

const publisher = mongoose.model(publisherSchema);
module.exports(publisher);
