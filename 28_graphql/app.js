import bodyParser from 'body-parser';
import 'dotenv/config';
import express from 'express';

import { createHandler } from 'graphql-http/lib/use/express';
import { connect } from 'mongoose';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

import graphqlResolver from './graphql/resolvers.js';
import graphqlSchema from './graphql/schema.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'images'),
  filename: (req, file, cb) => cb(null, uuidv4() + '-' + file.originalname),
});
const fileFilter = (req, file, cb) => {
  const filterArray = ['image/png', 'image/jpg', 'image/jpeg'];
  filterArray.includes(file.mimetype) ? cb(null, true) : cb(null, false);
};

app.use(bodyParser.json());

app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);

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

console.log(graphqlResolver)
app.all(
  '/graphql',
  createHandler({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
  })
);

app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.statusCode || 500).json({
    message: error.message,
    data: error.data,
  });
});

connect(process.env.MONGO_DB_URL)
  .then(_ => app.listen(8080))
  .catch(err => console.error(err));




// import { buildSchema } from 'graphql';

// const schema = buildSchema(`
//   type Query {
//     hello: String
//   }
// `);

// const rootQuery = {
//   hello() {
//     return 'Hello world!';
//   },
// };

// app.all(
//   '/graphql',
//   createHandler({
//     schema: schema,
//     rootValue: rootQuery,
//   })
// );