import fs from 'fs';
import path from 'path';
import Order from '../models/order.js';
import Product from '../models/product.js';
import rootDir from '../util/path.js';

function getProducts(req, res, next) {
  Product.find()
    .then(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products',
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
}

function getProduct(req, res, next) {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        pageTitle: product.title,
        product: product,
        path: '/products',
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
}

function getIndex(req, res, next) {
  Product.find()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'My Shop',
        path: '/',
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
}

function getCart(req, res, next) {
  req.user
    .populate('cart.items.productId')
    .then(user => {
      res.render('shop/cart', {
        pageTitle: 'Your Cart',
        path: '/cart',
        products: user.cart.items,
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
}

function postCart(req, res, next) {
  const prodId = req.body.productId;
  Product.findById(prodId).then(product => {
    req.user.addToCart(product);
    res.redirect('/cart');
  });
}

function postCartDeleteProduct(req, res, next) {
  const prodId = req.body.productId;
  req.user
    .removeFromCart(prodId)
    .then(_ => res.redirect('/cart'))
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
}

function getOrders(req, res, next) {
  Order.find({ 'user.userId': req.session.user._id }).then(orders =>
    res.render('shop/orders', {
      pageTitle: 'Your Orders',
      path: '/orders',
      orders: orders,
    })
  );
}

function getCheckout(req, res, next) {
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path: '/checkout',
  });
}

function postOrder(req, res, next) {
  req.user
    .populate('cart.items.productId')
    .then(user => {
      const products = user.cart.items.map(i => ({
        quantity: i.quantity,
        product: { ...i.productId._doc },
      }));
      const order = new Order({
        user: { email: req.user.email, userId: req.user._id },
        products: products,
      });
      return order.save();
    })
    .then(_ => req.user.clearCart())
    .then(_ => res.redirect('/orders'))
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
}

function getInvoice(req, res, next) {
  const orderId = req.params.orderId;
  const invoiceName = `invoice-${orderId}.pdf`;
  console.log(invoiceName);
  const invoicePath = path.join(rootDir, 'data', 'invoices', invoiceName);
  console.log(invoicePath);
  fs.readFile(invoicePath, (err, data) => {
    if (err) return next(err);
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', 'inline; filename="' + invoiceName + '"');
    res.send(data);
  });
}

export default {
  getProducts,
  getIndex,
  getCart,
  getCheckout,
  getOrders,
  getProduct,
  postCart,
  postCartDeleteProduct,
  postOrder,
  getInvoice,
};
