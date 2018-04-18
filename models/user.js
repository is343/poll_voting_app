'use strict';

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }, 
  polls: [{
    type: String,
    ref: 'Poll'
  }]
});

// update password field with hashed password before save to db
userSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.hash(user.password, 10)
  .then((hashedPassword) => {
    user.password = hashedPassword
    next();
  }, (err) => {
    return next(err)
  });
});

// compare given password with encryped password in db for login
userSchema.methods.comparePassword = function (candidatePassword, next) { // no arrow fxn for 'this.password'
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => { // test then callback
    if (err) {
      return next(err);
    }
    next(null, isMatch);
  });
};

const User = mongoose.model('User', userSchema);

export default User;