'use strict';

import mongoose from 'mongoose';
import express from 'express';
import shortid from 'shortid';
import { loginRequired, ensureCorrectUser } from '../middleware/auth';
import * as db from '../models';
const router = express.Router({ mergeParams: true });


// CREATE - VOTE ON A POLL
router.post('/:pollId', voteOnPoll);

// login middleware for everything below
router.use(loginRequired);

// CREATE - ADD NEW POLL TO DB
router.post('/', createPoll);

// authorization middleware for everything below
router.use(ensureCorrectUser);

// UPDATE -  EDIT POLL 
router.put('/:pollId', updatePoll);

// DESTROY - DELETE POLL FROM DB
router.delete('/:pollId', deletePoll);


//////////////////////
// HELPER FUNCTIONS //
//////////////////////

function voteOnPoll(req, res) {
  const choiceIndex = req.body.choiceId; // index of choice from choices
  db.Poll.findById(req.params.pollId, (err, foundPoll) => {
    if (err) {
      res.status(400).json(err);
    } else {
      let newValue = foundPoll.votes[choiceIndex] + 1;
      foundPoll.votes.set(choiceIndex, newValue); // need .set for altering mongoose arrays
      foundPoll.totalVotes++;
      foundPoll.save();
      return res.status(200).json({ success: 'Voted' });
    }
  });
}

function createPoll (req, res, next) {
  const _id = shortid.generate(),
   title = req.body.title,
   choices = req.body.choices,
   votes = Array(choices.length).fill(0),
   totalVotes = 0,
   userId = res.locals.userId,
   username = res.locals.username;
   
  const newPoll = new db.Poll({
    _id,
    title,
    choices,
    votes,
    totalVotes,
    userId,
    username
  });

  db.Poll.create(newPoll)
  .then((poll) => {
    db.User.findById(userId)
    .then((user) => {
      user.polls.push(poll._id);
      user.save()
      .then((user) => {
        return poll;
        return db.Poll.findByIdAndUpdate(poll._id, { 'username': user.username });
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



export default router;

