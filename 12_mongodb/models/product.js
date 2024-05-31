import { ObjectId } from 'mongodb';
import { getDb } from '../util/database.js';

class Product {
  constructor(title, price, description, imageUrl, id) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id;
  }

  save() {
    const db = getDb();
    let dbOp;

    if (this._id) {
      // Update the product
      dbOp = db
        .collection('products')
        .updateOne(
          { _id: ObjectId.createFromHexString(this._id) },
          { $set: this }
        );
    } else {
      dbOp = db.collection('products').insertOne(this);
    }
    return dbOp.then(res => console.log(res)).catch(err => console.error(err));
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection('products')
      .find()
      .toArray()
      .then(products => {
        console.log(products);
        return products;
      })
      .catch(err => console.error(err));
  }
  static findById(prodId) {
    const db = getDb();
    return db
      .collection('products')
      .find({ _id: ObjectId.createFromHexString(prodId) })
      .next()
      .then(product => {
        console.log(product);
        return product;
      })
      .catch(err => console.error(err));
  }
}

export default Product;
