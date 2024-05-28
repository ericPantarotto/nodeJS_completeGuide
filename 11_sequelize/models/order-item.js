import Sequelize from 'sequelize';
import { expPool as sequilize } from '../util/database.js';

const OrderItem   = sequilize.define('orderItem', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    },
    quantity: Sequelize.INTEGER
});

export default OrderItem;
