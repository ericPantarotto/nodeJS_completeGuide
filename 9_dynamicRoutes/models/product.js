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
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    _getProductsFromFile((products, pathFromCallback) => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          prod => prod.id === this.id
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        writeFile(pathFromCallback, JSON.stringify(updatedProducts), () => {});
      } else {
        this.id = uuidv4();
        products.push(this);
        writeFile(pathFromCallback, JSON.stringify(products), () => {});
      }
    });
  }

  static deleteById(id) {
    _getProductsFromFile((products, pathFromCallback) => {
      const updatedProducts = products.filter(p => p.id !== id);
      writeFile(pathFromCallback, JSON.stringify(updatedProducts), () => {});
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
