import express from 'express';
// import { createServer } from 'http';

const app = express();

app.use((req, res, next) => {
  console.log('In Middleware 1');
  next();
});

app.use((req, res, next) => {
  console.log('In Middleware 2');
  res.send('<h1>Hello from Express.js!</h1>');
});

// const server = createServer(app);
// server.listen(3000);

// HACK: replace above code with express.js and removing http import
app.listen(3000);

//INFO: from node_modules/ express / lib / application.js
// app.listen = function listen() {
//   var server = http.createServer(this);
//   return server.listen.apply(server, arguments);
// };
