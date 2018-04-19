'use strict';

import mongoose from 'mongoose';
import express from 'express';

const router = express.Router();

// import { check, body, validationResult, checkSchema } from 'express-validator/check';
// import { matchedData, sanitize } from 'express-validator/filter';

import jwt from 'jsonwebtoken';

import * as db from '../models';
import * as authRoutes from './auth';


// Get home
router.get('/', (req, res) => {
  res.json([
    { '/api/customers': 'get customer data' }
  ]);
});

// GET ALL USERS
router.get('/users', (req, res) => {
  db.User.find({}, (err, user) => {
    if (err) {
      console.error(err);
    } else {
      res.json(user);
    }
  })
});

// GET ALL POLLS
router.get('/polls', (req, res) => {
  db.Poll.find({}, (err, poll) => {
    if (err) {
      console.error(err);
    } else {
      res.json(poll);
    }
  })
});

// auth middleware
// nested routes - merge params
// deal with middleware in polls

// /polls/pollId === voting
// auth unique id check


// check to make sure that there are at least two (unique) poll choices!

// dealing with logins

export default router;