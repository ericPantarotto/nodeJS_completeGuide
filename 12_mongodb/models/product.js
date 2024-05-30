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
    db.collection('products')
      .insertOne(this)
      .then(res => console.log(res))
      .catch(err => console.error(err));
  }
}

export default Product;
