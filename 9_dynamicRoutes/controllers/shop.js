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

function getProduct(req, res, next) {
  const prodId = req.params.productId;
  Product.findById(prodId, product => console.log(product));
  res.redirect('/');
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

function getOrders(req, res, next) {
  res.render('shop/orders', {
    pageTitle: 'Your Orders',
    path: '/orders',
  });
}

function getCheckout(req, res, next) {
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path: '/checkou',
  });
}

export default {
  getProducts,
  getIndex,
  getCart,
  getCheckout,
  getOrders,
  getProduct,
};
