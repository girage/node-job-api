const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Please provide name'],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    require: [true, 'Please provide e-mail'],
    match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      , 'Please provide valid email'],
    unique: true,
  },
  password: {
    type: String,
    require: [true, 'Please provide password'],
    minlength: 6,
  },
})

UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  console.log(this);
  this.password = await bcrypt.hash(this.password, salt);
  next();
})

UserSchema.methods.createJWT = function () {
  const token = jwt.sign(
    { userId: this.id, name: this.name, },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME, }
  )
  return token;
}

module.exports = mongoose.model('User', UserSchema);