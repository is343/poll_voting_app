'use strict';

import mongoose from 'mongoose';
import express from 'express';

const router = express.Router();

// import { check, body, validationResult, checkSchema } from 'express-validator/check';
// import { matchedData, sanitize } from 'express-validator/filter';

import jwt from 'jsonwebtoken';

import * as db from '../models';
import * as authRoutes from './auth';

// import shortid from 'shortid';



export default router;