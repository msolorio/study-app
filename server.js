const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// replace mongoose internal promises with ES6 promises
mongoose.Promise = global.Promise;

// config js holds app constants
const { PORT, DATABASE_URL } = require('./config');

const app = express();

app.use(bodyParser.json());

// logs HTTP layer
app.use(morgan('common'));

const sessionsRouter = require('./routers/sessionsRouter');

// requests to /sessions will be routed to sessionsRouter
app.use('/sessions', sessionsRouter);

app.use('*', (req, res) => {
  res.status(404).json({message: 'The requested resource was not found'});
});


////////////////////////////////////////////////////////////////////

// accessible from runServer and closeServer to make sure we are dealing with
// the same server for each call
let server;

function runServer(databaseUrl=DATABASE_URL, port=PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, (err) => {
      if (err) return reject(err);

      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', (err) => {
        mongoose.disconnect();
        reject(err);
      })
    });
  });
}

function closeServer(port=PORT) {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log(`Closing server on port ${port}`);
      server.close((err) => {
        if (err) return reject(err);

        resolve();
      });
    });
  });
}

// if file is run directly by calling node server js
// we call runServer
if (require.main === module) {
  runServer().catch((err) => {
    console.error('error:', err);
  });
}

// allows us to import utility functions for when we need to run from another file
// such as when running tests
module.exports = {app, runServer, closeServer };
