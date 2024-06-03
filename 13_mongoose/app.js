import bodyParser from 'body-parser';
import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import errorController from './controllers/error.js';
import User from './models/user.js';
import adminRoutes from './routes/admin.js';
import { expRouter as shopRoutes } from './routes/shop.js';
import { mongoConnect } from './util/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('665aef8738b6fbe69fad3d3e')
    .then(user => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch(err => console.errror(err));
});

app.use('/admin', adminRoutes.routes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(_ => app.listen(3000));
