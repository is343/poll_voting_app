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
// var routes = require('./routes/index');
// var users = require('./routes/users');


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

app.use('/api', authRoutes);


//////////////
// SET PORT //
//////////////
app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), () => `Server running on port ${app.get('port')}`);

