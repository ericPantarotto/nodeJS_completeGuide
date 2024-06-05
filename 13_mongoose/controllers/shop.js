import Product from '../models/product.js';
function getProducts(req, res, next) {
  Product.find()
    .then(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products',
      });
    })
    .catch(err => console.log(err));
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
    .catch(err => console.error(err));
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
    .catch(err => console.log(err));
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
    .catch(err => console.error(err));
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
    .deleteItemFromCart(prodId)
    .then(_ => res.redirect('/cart'))
    .catch(err => console.error(err));
}

function getOrders(req, res, next) {
  req.user.getOrders().then(orders =>
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
    .addOrder()
    .then(_ => res.redirect('/orders'))
    .catch(err => console.error(err));
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
};
