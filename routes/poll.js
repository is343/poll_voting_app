'use strict';

import mongoose from 'mongoose';
import express from 'express';

const router = express.Router({ mergeParams: true });

import shortid from 'shortid';

import * as db from '../models';


// CREATE - ADD NEW POLL TO DB
router.post('/', createPoll);

// UPDATE -  EDIT POLL 
router.put('/:pollId', updatePoll);
// router.put('/:pollId', checkCampgroundOwnership, updatePoll);

// DESTROY - DELETE POLL FROM DB
router.delete('/:pollId', deletePoll);
// router.delete('/:pollId', checkCampgroundOwnership, deletePoll);



//////////////////////
// HELPER FUNCTIONS //
//////////////////////

function createPoll (req, res, next) {
  const _id = shortid.generate(),
   title = req.body.title,
   choices = req.body.choices,
   votes = Array(choices.length).fill(0),
   totalVotes = 0,
   userId = req.params.id;
   
  const newPoll = new db.Poll({
    _id,
    title,
    choices,
    votes,
    totalVotes,
    userId
  });

  db.Poll.create(newPoll)
  .then((poll) => {
    db.User.findById(userId)
    .then((user) => {
      user.polls.push(poll._id);
      user.save()
      .then((user) => {
        return db.Poll.findById(poll._id).populate("userId", { username: true });
        // returns new poll with extra populated information for use by client
      })
      .then((p) => {
        return res.status(200).json(p);
      })
      .catch(next);
    })
    .catch(next);
  })
  .catch(next);
};

function updatePoll(req, res) {
  const title = req.body.title,
    choices = req.body.choices;
  // find and update the updatable fields
  db.Poll.findByIdAndUpdate(req.params.pollId, { title, choices }, (err, foundPoll) => {
    if (err) {
      res.status(400).json(err);
    } else {
      return res.status(200).json({ success : 'Poll updated' });
    }
  });
};

function deletePoll(req, res) {
  // find and update the correct poll
  db.Poll.findByIdAndRemove(req.params.pollId, (err) => {
    if (err) {
      res.status(404).json(err);
    } else {
      return res.status(200).json({ success : 'Poll deleted' });
    }
  });
};



////////////////////////
// MOVE TO MIDDLEWARE //
////////////////////////

// this requires passport

function checkCampgroundOwnership (req, res, next) {
  Poll.findById(req.params.id, (err, foundPoll) => {
    if (err || !foundPoll) {
      res.status(404).json(err);
    } else {
      // does user own campground
      if (foundPoll.userId.equals(req.user._id)) { // req.user._id is from passport
        next();
      } else {
        res.status(400).json({error : 'You cannot edit that campground'});
      }
    }
  });
};

export default router;

