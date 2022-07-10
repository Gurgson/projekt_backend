const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please set your username'],
    minlength: [5, 'Your username has to have at least 5 characters'],
    maxlength: [
      20,
      'Your username has to have maximum 20 characters'
    ],
    unique: true,
    trim: true
  },
  name: {
    type: String
  },
  surname: {
    type: String
  },
  password: {
    type: String,
    required: [
      true,
      'Please provide password with at least 8 characters'
    ],
    minlenth: [8, 'Your passwrod has to have at least 8 characters'],
    maxlenth: [20, 'Your password has to have maximum 20 characters'],
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [
      true,
      'Please provide a matching password with at least 8 characters'
    ],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: 'Please provide a matching password'
    }
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, 'Please provide an email'],
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  passwordChangedAt: Date,
  role: {
    type: String,
    enum: ['User', 'Admin'],
    default: 'User'
  },
  active: {
    type: Boolean,
    default: true,
    select: false
  }
});
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 14);
  this.passwordConfirm = undefined;
  next();
});
userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});
userSchema.methods.correctPassword = function (
  candidatePassword,
  userPassword
) {
  return bcrypt.compare(candidatePassword, userPassword);
};
userSchema.methods.changedPasswordAfter = function (JWTTimesstamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    console.log(this.passwordChangedAt, JWTTimesStamp);
    return JWTTimesstamp < changedTimestamp;
  }
  return false;
};
const User = mongoose.model('User', userSchema);
module.exports = User;
