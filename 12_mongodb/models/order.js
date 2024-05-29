import Sequelize from 'sequelize';
import { expPool as sequilize } from '../util/database.js';

const Order = sequilize.define('order', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

export default Order;
