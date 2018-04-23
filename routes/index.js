'use strict';

import mongoose from 'mongoose';
import express from 'express';
import jwt from 'jsonwebtoken';
import * as db from '../models';
import * as authRoutes from './auth';
const router = express.Router();


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


export default router;