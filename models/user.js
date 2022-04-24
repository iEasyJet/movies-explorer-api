const mongoose = require('mongoose');
const validator = require('validator');
const { WRONG_EMAIL } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  email: {
    required: true,
    unique: true,
    type: String,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: () => WRONG_EMAIL,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

module.exports = mongoose.model('user', userSchema);
