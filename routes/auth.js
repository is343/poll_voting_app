"use strict";

import mongoose from "mongoose";
import express from "express";

const router = express.Router();

import jwt from "jsonwebtoken";

import * as db from "../models";

router.post("/login", login);
router.post("/signup", signup);

function login(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  db.User.findOne({ username })
    .then(user => {
      // comparePassword is a userSchema method we created
      user.comparePassword(password, (err, isMatch) => {
        if (isMatch) {
          const token = jwt.sign(
            { userId: user._id, username },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "2 hours" }
          );
          res.status(200).json({
            userId: user._id,
            username,
            token
          });
        } else {
          console.error("DB error:", err);
          res.status(400).json({ message: "Invalid username/password" });
        }
      });
    })
    .catch(err => {
      console.error("DB error:", err);
      res.status(400).json({ message: "Invalid username/password" });
    });
}

function signup(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const newUser = new db.User({
    username,
    password
  });
  db.User.create(newUser)
    .then(user => {
      const token = jwt.sign(
        { userId: user._id, username },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "2 hours" }
      );
      res.status(200).json({
        userId: user._id,
        username,
        token
      });
    })
    .catch(err => {
      console.error("DB error:", err);
      res.status(400).json({ message: "Username already taken" });
    });
}

export default router;
