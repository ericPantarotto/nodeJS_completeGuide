import Cart from '../models/cart.js';
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
  Product.findById(prodId, product => {
    if (product)
      res.render('shop/product-detail', {
        pageTitle: product.title,
        product: product,
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
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = products.map(prod => {
        const cartProductData = cart.products.find(o => o.id === prod.id);
        if (cartProductData)
          return { productData: prod, qty: cartProductData.qty };
      });
      res.render('shop/cart', {
        pageTitle: 'Your Cart',
        path: '/cart',
        products: cartProducts,
      });
    });
  });
}

function postCart(req, res, next) {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect('/cart');
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
    path: '/checkout',
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
};
