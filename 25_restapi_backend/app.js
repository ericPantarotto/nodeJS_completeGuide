import bodyParser from 'body-parser';
import 'dotenv/config';
import express from 'express';
import { connect } from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

import feedRoutes from './routes/feed.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

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

app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.statusCode || 500).json({
    message: error.message,
  });
});

connect(process.env.MONGO_DB_URL)
  .then(_ => app.listen(8080))
  .catch(err => console.error(err));
