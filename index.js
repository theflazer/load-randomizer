const _ = require('lodash');
const request = require('request');
const express = require('express');
const ngrok = require('ngrok');
const app = express();

const server = require('http').createServer(app);
const listenPort = 4000;

const getPorts = () => {
  return _.reduce(process.argv, (result, arg) => {
    if (!_.isNaN(parseInt(arg, 10))) {
      result.push(arg);
    }
    return result;
  }, []);
}

server.listen(listenPort, '0.0.0.0', () => {
  if (_.includes(process.argv, 'ngrok')) {
    ngrok.connect(listenPort, (err, url) => {
      if (err) {
        console.log('There was an error setting up your tunnel')
      }
      console.log('Access available at\x1b[36m', `${url}`, '\x1b[0m');
    })
  }
  console.log('Express server listening on 4000');
  app.use('/', (req, res) => {
    const ports = getPorts();
    var url = _.round(Math.random()) === 1 ?
      `http://0.0.0.0:${_.get(ports, '[0]', 3000)}`
      :
      `http://0.0.0.0:${_.get(ports, '[1]', 3001)}`
    console.log(`Request for '${req.path}' => ${url}`);
    req.pipe(request(url)).pipe(res);
  });
});

exports = module.exports = app;
