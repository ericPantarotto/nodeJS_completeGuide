import bodyParser from 'body-parser';
import 'dotenv/config';
import express from 'express';
import { connect } from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

import errorController from './controllers/error.js';
import User from './models/user.js';
import adminRoutes from './routes/admin.js';
import { expRouter as shopRoutes } from './routes/shop.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('665f1562379843dac5393aa7')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.errror(err));
});

app.use('/admin', adminRoutes.routes);
app.use(shopRoutes);

app.use(errorController.get404);

// mongoConnect(_ => app.listen(3000));
connect(process.env.MONGO_DB_URL)
  .then(_ => app.listen(3000))
  .catch(err => console.error(err));

//  new User({
//    name: 'Eric',
//    email: 'ecr@gmail.com',
//    cart: { items: [] },
//  }).save();
