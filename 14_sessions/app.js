import bodyParser from 'body-parser';
import connectMongoDBSession from 'connect-mongodb-session';
import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import { connect } from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

import errorController from './controllers/error.js';
// import User from './models/user.js';
import adminRoutes from './routes/admin.js';
import { expRouter as authRoutes } from './routes/auth.js';
import { expRouter as shopRoutes } from './routes/shop.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const MongoDBStore = connectMongoDBSession(session);
const store = new MongoDBStore({
  uri: process.env.MONGO_DB_URL,
  collection: 'sessions',
});

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

// HACK: this will be solving all mongoose model related issue in section 246
// app.use((req, res, next) => {
//   console.log(req.session.user);
//   User.findById(req.session.user._id)
//     .then(user => {
//       console.log(user);
//       req.user = user;
//       next();
//     })
//     .catch(err => console.error(err));
// });

app.use('/admin', adminRoutes.routes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

// mongoConnect(_ => app.listen(3000));
connect(process.env.MONGO_DB_URL)
  .then(_ => app.listen(3000))
  .catch(err => console.error(err));
