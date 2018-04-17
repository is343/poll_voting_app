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

import * as auth from './middleware/auth';

// Initialize the express App
const app = express();

//////////////////////
// MIDDLEWARE SETUP //
//////////////////////
app.use(helmet());
app.use(morgan('dev')); // logger
app.use(compression());
app.use(express.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(express.json()); // parse application/json
app.use(cors()); // allows any domain can make a request for the api

////////////////
// SET ROUTES //
////////////////


app.use('/', routes);

// app.use('/api/users/:id/poll', pollRoutes);
app.use('/api/users/:id/poll',
  auth.loginRequired, auth.ensureCorrectUser,
  pollRoutes);

app.use('/api/auth', authRoutes);


//////////////
// SET PORT //
//////////////
app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), () => `Server running on port ${app.get('port')}`);

