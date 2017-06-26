const express = require('express');

const router = express.Router();

const { Session } = require('../models');

router.get('/', (req, res) => {
  Session
    .find()
    .exec()
    .then((sessions) => {
      res.status(200).json({sessions: sessions.map((session) => session.apiRepr())});
    })
    .catch((err) => {
      console.error('error:', err);
      res.status(500).json({message: 'The server encountered an error retrieving all sessions'});
    });
});

router.get('/:id', (req, res) => {
  Session
    .findById(req.params.id)
    .exec()
    .then((session) => {
      res.status(200).json({session: session.apiRepr()});
    })
    .catch((err) => {
      console.error('error:', err);
      res.status(500).json({message: `The server encountered an error retrieving session with id ${req.params.id}`});
    });
});

router.post('/', (req, res) => {

  // in finished app client will trigger POST request when clocking out
  // simulates a 1 hours session starting 1 hour before current time
  // ending at current time
  const clockIn = new Date().setHours(new Date().getHours() - 1);
  const clockOut = new Date();

  // sessionTotal holds total session time in minutes
  const sessionTotal = (clockOut - clockIn) / 60000;
  console.log('sessionTotal:', sessionTotal);

  Session
    .create({
      clockIn: clockIn,
      clockOut: clockOut,
      sessionTotal: sessionTotal,
      tags: req.body.tags,
      notes: req.body.notes
    })
    .then((session) => {
      res.status(201).json(session.apiRepr());
    })
    .catch((err) => {
      console.error('error:', err);
      res.status(500).json({message: `The server encountered an error creating your session`});
    });
});

module.exports = router;