const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// replace mongoose internal promises with ES6 promises
mongoose.Promise = global.Promise;

// config js holds app constants
const { PORT, DATABASE_URL } = require('./config');
