'use strict';

import dotenv from 'dotenv'
dotenv.config()


import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';


import routes from './routes/index';
import authRoutes from './routes/auth';
import pollRoutes from './routes/poll';


// Initialize the express App
const app = express();

//////////////////////
// MIDDLEWARE SETUP //
//////////////////////
app.use(helmet());
// logger
app.use(morgan('dev'));
app.use(compression());
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// parse application/json
app.use(express.json());
// cors allows any domain can make a request for the api
app.use(cors());

////////////////
// SET ROUTES //
////////////////

// Get home
app.get('/', (req, res) => {
  res.json([
    { '/api/customers': 'get customer data' }
  ]);
});

import * as db from './models';


// GET ALL USERS
app.get('/users', (req, res) => {
  db.User.find({}, (err, user) => {
    if (err) {
      console.error(err);
    } else {
      res.json(user);
    }
  })
});

// GET ALL POLLS
app.get('/polls', (req, res) => {
  db.Poll.find({}, (err, poll) => {
    if (err) {
      console.error(err);
    } else {
      res.json(poll);
    }
  })
});

app.use('/api/users/:id/poll', pollRoutes);
// app.use('/api/users/:id/poll',
//   auth.loginRequired, auth.ensureCorrectUser,
//   pollRoutes);

app.use('/api/auth', authRoutes);


//////////////
// SET PORT //
//////////////
app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), () => `Server running on port ${app.get('port')}`);

