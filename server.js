'use strict';

import dotenv from 'dotenv'
dotenv.config()


import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
// const express = require('express');

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

// MongoDB Connection
mongoose.set('debug', true);
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/voting', (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  }

  // feed some dummy data in DB.
  dummyData();
});

// SCHEMA SETUP 
const customerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String
});

const Customer = mongoose.model('Customer', customerSchema);

function dummyData() {
  Customer.count().exec((err, count) => {
    if (count > 0) {
      return;
    }
    const customers = [
      { firstName: 'John', lastName: 'Doe' },
      { firstName: 'Brad', lastName: 'Traversy' },
      { firstName: 'Mary', lastName: 'Swanson' },
    ];
    
    Customer.create(customers, (err, customer) => {
        if (err) {
          console.error('error...', err);
        } else {
          console.log('new customer...', customer);
        }
      }
    );
  });
}

app.get('/', (req, res) => {
  res.json([
    {'/api/customers': 'get customer data' }
  ]);
});

app.get('/api/customers', (req, res) => {
  // GET FROM DB
  Customer.find({}, (err, customers) => {
    if(err){
      console.error(err);
    } else {
      res.json(customers);
    }
  })
});

// Create / dogs	POST	Create a new dog, then redirect somewhere	Dog.create()
app.post('/api/customers', (req, res) =>{
  console.log(req.body);
  console.log(req.body.firstName, req.body.lastName);
  Customer.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName
  });
});

const port = process.env.PORT || 5000;

app.listen(port, () => `Server running on port ${port}`);


// // Apply body Parser and server public assets and routes
// app.use(compression());
// app.use(bodyParser.json({ limit: '20mb' }));
// app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
// app.use(Express.static(path.resolve(__dirname, '../dist/client')));
// app.use('/api', posts);


// mongoose.connect(process.env.DATABASEURL, { useMongoClient: true });
// app.use(bodyParser.urlencoded({ extended: true }));// tells express to use body parser
// app.set('view engine', 'ejs');
// app.use(express.static(__dirname + '/public'));
// app.use(methodOverride('_method'));
// app.use(flash());