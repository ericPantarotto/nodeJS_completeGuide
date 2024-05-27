import bodyParser from 'body-parser';
import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import errorController from './controllers/error.js';
import Product  from './models/product.js';
import User from './models/user.js';
import adminRoutes from './routes/admin.js';
import { expRouter as shopRoutes } from './routes/shop.js';
import { expPool as sequilize } from './util/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes.routes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

sequilize
  .sync({force: true})
  .then(result => {
    // console.log(result);
    app.listen(3000);
  })
  .catch(err => console.error(err));
