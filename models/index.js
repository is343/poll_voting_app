"use strict";

import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

// SETUP
mongoose.set("debug", true);
mongoose.Promise = global.Promise;

// CONNECT
mongoose.connect(
  process.env.MONGO_URI || "mongodb://localhost/voting",
  error => {
    if (error) {
      console.error("Please make sure Mongodb is installed and running!"); // eslint-disable-line no-console
      throw error;
    }
  },
  {
    keepAlive: true,
    reconnectTries: Number.MAX_VALUE,
    useMongoClient: true
  }
);

// IMPORT / EXPORT MODELS
import User from "./user";
import Poll from "./poll";

export { User, Poll };
