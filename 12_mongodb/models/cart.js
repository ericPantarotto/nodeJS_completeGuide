import Sequelize from 'sequelize';
import { expPool as sequilize } from '../util/database.js';

const Cart = sequilize.define('cart', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

export default Cart;
