import { readFile, writeFile } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const _getProductsFromFile = cb => {
  const p = path.join(path.dirname(__dirname), 'data', 'products.json');

  readFile(p, (err, fileContent) => {
    if (err) {
      return cb([], p);
    }
    return cb(JSON.parse(fileContent), p);
  });
};

class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    this.id = uuidv4();
    _getProductsFromFile((products, pathFromCallback) => {
      products.push(this);
      writeFile(pathFromCallback, JSON.stringify(products), () => {});
    });
  }

  static fetchAll(cb) {
    _getProductsFromFile(cb);
  }

  static findById(id, cb) {
    _getProductsFromFile(products => {
      const product = products.find(p => p.id === id);
      cb(product);
    });
  }
}

export default Product;
