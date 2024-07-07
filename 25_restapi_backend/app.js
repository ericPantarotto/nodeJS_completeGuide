import bodyParser from 'body-parser';
import 'dotenv/config';
import express from 'express';
import { connect } from 'mongoose';
import feedRoutes from './routes/feed.js';

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/feed', feedRoutes.routes);


connect(process.env.MONGO_DB_URL)
  .then(_ => app.listen(8080))
  .catch(err => console.error(err));
