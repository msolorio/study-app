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

module.exports = router;