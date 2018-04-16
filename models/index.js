'use strict';

import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose';

// SETUP
mongoose.set('debug', true);
mongoose.Promise = global.Promise;

// CONNECT
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/voting', (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  }

  // feed some dummy data in DB.
  // dummyData();
}, {
    keepAlive: true,
    reconnectTries: Number.MAX_VALUE,
    useMongoClient: true
  });

function dummyData() {
  User.count().exec((err, count) => {
    if (count > 0) {
      return;
    }
    const users = [
      { firstName: 'John', lastName: 'Doe' },
      { firstName: 'Brad', lastName: 'Traversy' },
      { firstName: 'Mary', lastName: 'Swanson' },
    ];

    User.create(users, (err, user) => {
      if (err) {
        console.error('error...', err);
      } else {
        console.log('new customer...', user);
      }
    }
    );
  });
}

// INPORT / EXPORT MODELS
import User from './user';


export {User};

