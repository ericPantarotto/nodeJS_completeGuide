import { ObjectId } from 'mongodb';
import { getDb } from '../util/database.js';

class Product {
  constructor(title, price, description, imageUrl) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  save() {
    const db = getDb();
    return db
      .collection('products')
      .insertOne(this)
      .then(res => console.log(res))
      .catch(err => console.error(err));
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
