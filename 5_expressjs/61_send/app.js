import express from 'express';
import { createServer } from 'http';

const app = express();

app.use((req, res, next) => {
  console.log('In Middleware 1');
  // HACK: allows the request to continue to te next middleware
  next();
});

app.use((req, res, next) => {
  console.log('In Middleware 2');
  res.send('<h1>Hello from Express.js!</h1>');
});

const server = createServer(app);
server.listen(3000);
