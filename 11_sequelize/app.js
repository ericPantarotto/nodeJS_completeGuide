import bodyParser from 'body-parser';
import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import errorController from './controllers/error.js';
import CartItem from './models/cart-item.js';
import Cart from './models/cart.js';
import OrderItem from './models/order-item.js';
import Order from './models/order.js';
import Product from './models/product.js';
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

app.use((req, res, next) => {
  User.findByPk(1)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.errror(err));
});

app.use('/admin', adminRoutes.routes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });

sequilize
  //HACK: to use only if we want to force the database refresh!
  // .sync({ force: true })
  .sync()
  .then(result => {
    // console.log(result);
    return User.findByPk(1);
  })
  .then(user => {
    if (!user) return User.create({ name: 'Eric', email: 'ecr@gmail.com' });
    return Promise.resolve(user);
  })
  .then(user => {
    // console.log(user);
    user.createCart();
  })
  .then(cart => app.listen(3000))
  .catch(err => console.error(err));
