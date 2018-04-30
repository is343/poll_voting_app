import jwt from "jsonwebtoken";

import * as db from "../models";

export function loginRequired(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (decoded) {
        // passing this on to the route
        res.locals.userId = decoded.userId;
        res.locals.username = decoded.username;
        next();
      } else {
        res.status(401).json({ message: "Please log in first" });
      }
    });
  } catch (e) {
    res.status(401).json({ message: "Please log in first" });
  }
}

export function ensureCorrectUser(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      db.Poll.findById(req.params.pollId, (err, foundPoll) => {
        if (err || !foundPoll) {
          return res.status(404).json(err);
        }
        if (decoded && foundPoll.userId.equals(decoded.userId)) {
          next();
        } else {
          res.status(401).json({ message: "Unauthorized" });
        }
      });
    });
  } catch (e) {
    res.status(401).json({ message: "Unauthorized" });
  }
}
