'use strict';

import mongoose from 'mongoose';
import User from './user';

const pollSchema = new mongoose.Schema({
  _id: String,
  title: {
    type: String,
    required: true,
    maxLength: 160
  },
  choices: [{
    type: String,
    required: true
  }],
  votes: [{
    type: Number,
    required: true
  }],
  totalVotes: {
    type: Number,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  username: {
    type: String,
    required: true,
  }
}, {
    timestamps: true
  });



// Remove poll from user's list
pollSchema.pre('remove', (next) => {
  User.findById(this.userId)
  .then((user) => {
    user.polls.remove(this.id);
    user.save().then((e) => {
      next();
    });
  }).catch((err) => {
    next(err);
  });
});


const Poll = mongoose.model('Poll', pollSchema);

export default Poll;