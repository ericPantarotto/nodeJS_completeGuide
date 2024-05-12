import { readFile, writeFile } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    const p = path.join(path.dirname(__dirname), 'data', 'products.json');

    readFile(p, (err, fileContent) => {
      let products = [];
      if (!err) {
        products = JSON.parse(fileContent);
      }
      products.push(this);
      writeFile(p, JSON.stringify(products), () =>  {});
    });
  }

  static fetchAll(cb) {
    const p = path.join(path.dirname(__dirname), 'data', 'products.json');

    readFile(p, (err, fileContent) => {
      if (err) {
        return cb([]);
      }
      return cb(JSON.parse(fileContent));
    });
  }
}

export default Product;
