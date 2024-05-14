import { readFile, writeFile } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const _getProductsFromFile = cb => {
  const p = path.join(path.dirname(__dirname), 'data', 'products.json');

  readFile(p, (err, fileContent) => {
    if (err) {
      return cb([]);
    }
    return cb(JSON.parse(fileContent), p);
  });
};

class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    _getProductsFromFile((products, pathFromCallback) => {
      products.push(this);
      writeFile(pathFromCallback, JSON.stringify(products), () => {});
    });
  }

  static fetchAll(cb) {
    _getProductsFromFile(cb);
  }
}

export default Product;
