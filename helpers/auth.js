'use strict';



import jwt from 'jsonwebtoken';

import * as db from '../models';

// Get users
export function signin (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  db.User.findOne({ username })
    .then((user) => {
      // comparePassword is a User Schema method
      user.comparePassword(password, (err, isMatch) => {
        if (isMatch) {
          const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
          res.status(200).json({
            userId: user._id,
            username,
            token
          });
        } else {
          res.status(400).json({ message: 'Invalid username/password' });
        }
      });
    })
    .catch((err) => {
      console.error('DB error:', err);
      res.status(400).json({ message: 'Invalid username/password' });
    })
};

export function signup (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const newUser = new db.User({
    username,
    password
  });
  db.User.create(newUser)
    .then((user) => {
      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
      res.status(200).json({
        userId: user._id,
        username,
        token
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json(err);
    })
};

