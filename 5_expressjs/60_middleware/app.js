import express from 'express';
import { createServer } from 'http';

const app = express();

app.use((req, res, next) => {
  console.log('In Middleware 1');
  next();
});

app.use((req, res, next) => console.log('In Middleware 2'));

const server = createServer(app);
server.listen(3000);
