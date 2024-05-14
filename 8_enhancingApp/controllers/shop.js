import Product from '../models/product.js';

function getProducts(req, res, next) {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products',
    });
  });
}

function getIndex(req, res, next) {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'My Shop',
      path: '/',
    });
  });
}

function getCart(req, res, next) {
  res.render('shop/cart', {
    pageTitle: 'Your Cart',
    path: '/cart',
  });
}

function getCheckout(req, res, next) {
    res.render('shop/checkout', {
      pageTitle: 'Checkout',
      path: '/checkou',
    });
}

export default { getProducts, getIndex, getCart, getCheckout };
