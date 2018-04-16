'use strict';

import express from 'express';

const router = express.Router();

import { check, body, validationResult, checkSchema } from 'express-validator/check';
import { matchedData, sanitize } from 'express-validator/filter';

import * as db from '../models';

import shortid from 'shortid';

// Get users
router.get('/users', (req, res) => {
  // GET FROM DB
  db.User.find({}, (err, user) => {
    if (err) {
      console.error(err);
    } else {
      res.json(user);
    }
  })
});


router.post('/users',
  body('username').isLength({ min: 1 }),
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      errors.array().forEach((err) => {
        console.error(err);
        res.json(err);

      })
    }
    else {
      const username = req.body.username;
      const password = req.body.password;
      const _id = shortid.generate()
      const newUser = new db.User({
        username,
        password,
        _id
      });
      db.User.create(newUser, (err, user) => {
        if (err) {
          console.error('Mongoose error :', err.message);
          res.json({ error: err.message });
        } else {
          res.json({ 'Success': user });
        }
      });
    }
  });


export default router;