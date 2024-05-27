import Cart from '../models/cart.js';
import Product from '../models/product.js';

function getProducts(req, res, next) {
  Product.findAll()
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
  Product.findByPk(prodId)
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
  Product.findAll()
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
    .getCart()
    .then(cart => cart.getProducts())
    .then(products => {
      res.render('shop/cart', {
        pageTitle: 'Your Cart',
        path: '/cart',
        products: products,
      });
    })
    .catch(err => console.error(err));

  // Cart.getCart(cart => {
  //   Product.fetchAll(products => {
  //     const cartProducts = cart.products.map(cartProduct => {
  //       const productData = products.find(o => o.id === cartProduct.id);
  //       return { productData: productData, qty: cartProduct.qty };
  //     });

  //     res.render('shop/cart', {
  //       pageTitle: 'Your Cart',
  //       path: '/cart',
  //       products: cartProducts,
  //     });
  //   });
  // });
}

function postCart(req, res, next) {
  const prodId = req.body.productId;
  let fetchCart;
  req.user
    .getCart()
    .then(cart => {
      fetchCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      const product = products[0];
      if (product) {
      }
      return Product.findByPk(prodId).then(product =>
        fetchCart.addProduct(product, { through: { quantity: 1 } })
      );
    })
    .then(_ => res.redirect('/cart'))
    .catch(err => console.error(err));
}

function postCartDeleteProduct(req, res, next) {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, +product.price);
    res.redirect('/cart');
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
  postCartDeleteProduct,
};
