const _ = require('lodash');
const request = require('request');
const express = require('express');
const ngrok = require('ngrok');
const app = express();

const server = require('http').createServer(app);
const listenPort = 4000;


server.listen(listenPort, '0.0.0.0', () => {
  if (_.includes(process.argv, 'ngrok')) {
    ngrok.connect(listenPort, (err, url) => {
      if (err) {
        console.log('There was an error setting up your tunnel')
      }
      console.log(`Access available at ${url}`);
    })
  }
  console.log('Express server listening on 4000');
  app.use('/', (req, res) => {
    var url = _.round(Math.random()) === 1 ?
      _.get(process, 'argv[2]', 'http://0.0.0.0:3000')
      :
      _.get(process, 'argv[3]', 'http://0.0.0.0:3001')
    console.log(`Request for '${req.path}' => ${url}`);
    req.pipe(request(url)).pipe(res);
  });
});

exports = module.exports = app;
