const _ = require('lodash');
const request = require('request');
const express = require('express');

const app = express();

const server = require('http').createServer(app);

server.listen(4000, '0.0.0.0', () => {
  console.log('Express server listening on 4000');
  app.use('/', (req, res) => {
    var url = _.round(Math.random()) === 1 ? 'http://0.0.0.0:3000' : 'http://0.0.0.0:3001';
    console.log(`Request for '${req.path}' => ${url}`);
    req.pipe(request(url)).pipe(res);
  });
});

exports = module.exports = app;
