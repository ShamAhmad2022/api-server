'use strict';

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const notFoundPage = require('./error-handlers/404');
const serverError = require('./error-handlers/500');
const musicRouter = require('../src/routes/music')
const gamesRouter = require('../src/routes/games')


app.get('/', homeHandler)
app.get('/intentionalError', intentionalError);

function homeHandler(req, res) {
    res.status(200).json({
      code:200,
      message: 'Welcome to Home page :)'
    })
}

function intentionalError(req, res, next) {
    req.body = {
      test: 'test'
    }
    next({message: 'some kind of error :('});
}

app.use(musicRouter);
app.use(gamesRouter);

app.use('*', notFoundPage);
app.use(serverError);


function start(port) {
  app.listen(port, () => console.log(`Up an running on port: ${port}`));
}

module.exports = {
  start,
  app
}