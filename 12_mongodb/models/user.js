import { ObjectId } from 'mongodb';
import { getDb } from '../util/database.js';
class User {
  constructor(userName, email, cart, id) {
    this.userName = userName;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }

  save() {
    const db = getDb();
    return db.collection('users').insertOne(this);
  }

  addToCart(product) {
    // const cartProduct = this.cart.items.findIndex(cp => cp._id === product._id);
    const updatedCart = { items: [{ ...product, quantity: 1 }] };
    const db = getDb();
    return db.collection('users').updateOne(
      {
        _id: ObjectId.createFromHexString(this._id),
      },
      { $set: { cart: updatedCart } }
    );
  }

  static findById(userId) {
    const db = getDb();
    return db
      .collection('users')
      .findOne({ _id: ObjectId.createFromHexString(userId) })
      .then(user => {
        console.log(user);
        return user;
      })
      .catch(err => console.error(err));
  }
}

export default User;
