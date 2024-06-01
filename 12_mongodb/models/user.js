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
    const updatedItems = [...(this.cart?.items || [])];
    const existingProductIndex = this.cart?.items.findIndex(
      cp => cp.productId.toString() === product._id.toString()
    );

    if (existingProductIndex >= 0) {
      updatedItems[existingProductIndex].quantity = ++this.cart.items[
        existingProductIndex
      ].quantity;
    } else {
      updatedItems.push({
        productId: product._id,
        quantity: 1,
      });
    }

    const db = getDb();
    return db.collection('users').updateOne(
      {
        _id: this._id,
      },
      { $set: { cart: { items: updatedItems } } }
    );
  }

  static findById(userId) {
    const db = getDb();
    return db
      .collection('users')
      .findOne({ _id: ObjectId.createFromHexString(userId) })
      .then(user => user)
      .catch(err => console.error(err));
  }
}

export default User;
