import { readFile, writeFile } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const p = path.join(path.dirname(__dirname), 'data', 'cart.json');

class Cart {
  static addProduct(id, productPrice) {
    readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }

      const existingProductIndex = cart.products.findIndex(
        prod => prod.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;

      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty += 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice += +productPrice;
      writeFile(p, JSON.stringify(cart), err => err && console.log(err));
    });
  }

  static deleteProduct(id, productPrice) {
    readFile(p, (err, fileContent) => {
      if (err) return;
      const cart = JSON.parse(fileContent);
      const updatedCart = { ...cart };
      const product = updatedCart.products.find(prod => prod.id === id);
      if (!product) return;

      updatedCart.products = updatedCart.products.filter(
        prod => prod.id !== id
      );
      updatedCart.totalPrice -= (product?.qty ?? 0) * productPrice;
      writeFile(p, JSON.stringify(updatedCart), err => err && console.log(err));
    });
  }

  static getCart(cb) {
    readFile(p, (err, fileContent) => {
      const cart = JSON.parse(fileContent);
      if (err) return cb(null);
      cb(cart);
    });
  }
}

export default Cart;
