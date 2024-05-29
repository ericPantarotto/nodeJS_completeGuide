import Sequelize from 'sequelize';
import { expPool as sequilize } from '../util/database.js';

const CartItem   = sequilize.define('cartItem', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    },
    quantity: Sequelize.INTEGER
});

export default CartItem;
