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

module.exports = router;