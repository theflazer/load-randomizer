# load-randomizer

Simple NodeJS server to randomly forward your traffic to two separate servers. This was built to test out how web application would behave when put behind a load balancer.

By default this server forwards requests to `3000` and `3001`

To install
```
npm install
```

To start the server with default ports:
```
npm start
```

To run with custom ports `3002` and `3003`
```
npm start 3002 3003
```

To run with custom ports `3002` and `3003` and use ngrok to make ports globally available
```
npm start 3002 3003 ngrok
```
