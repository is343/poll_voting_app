"use strict";

import mongoose from "mongoose";
import express from "express";
import { loginRequired, ensureCorrectUser } from "../middleware/auth";
import * as db from "../models";
const router = express.Router({ mergeParams: true });

// GET A USER'S INFO
router.get("/:username", getUserInfo);

// login middleware for everything below
router.use(loginRequired);

// authorization middleware for everything below
router.use(ensureCorrectUser);

// UPDATE -  EDIT USER
router.put("/:userId", updateUser);

// DESTROY - DELETE USER FROM DB
router.delete("/:userId", deleteUser);

//////////////////////
// HELPER FUNCTIONS //
//////////////////////

function getUserInfo(req, res) {
  db.User.findOne({ username: req.params.username }, (err, foundUser) => {
    if (err) {
      res.status(400).json(err);
    } else if (foundUser == null) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.json({ polls: foundUser.polls, userId: foundUser._id });
    }
  });
}

function updateUser(req, res) {
  const username = req.body.username,
    password = req.body.password;
  // find and update the updatable fields
  db.User.findByIdAndUpdate(
    req.params.userId,
    { username, password },
    (err, foundUser) => {
      if (err) {
        res.status(400).json(err);
      } else {
        return res.status(200).json({ message: "User updated" });
      }
    }
  );
}

function deleteUser(req, res) {
  // find and update the correct poll
  db.User.findByIdAndRemove(req.params.userId, err => {
    if (err) {
      res.status(404).json(err);
    } else {
      return res.status(200).json({ message: "User deleted" });
    }
  });
}

export default router;
