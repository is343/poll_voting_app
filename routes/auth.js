'use strict';

import mongoose from 'mongoose';
import express from 'express';

const router = express.Router();

// import { check, body, validationResult, checkSchema } from 'express-validator/check';
// import { matchedData, sanitize } from 'express-validator/filter';

// import jwt from 'jsonwebtoken';

// import * as db from '../models';

// import shortid from 'shortid';


import * as helpers from '../helpers/auth';

router.post('/signin', helpers.signin);
router.post('/signup', helpers.signup);

  
  
export default router;