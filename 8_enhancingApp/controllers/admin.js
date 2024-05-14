import Product from '../models/product.js';

function getAddProduct(req, res, next) {
  return res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
  });
}

function postAddProduct(req, res, next) {
  new Product(req.body.title).save();
  res.redirect('/');
}

function getProducts(req, res, next) {
    res.render('admin/products', {
      pageTitle: 'Admin Products',
      path: '/admin/products',
    });
}

export default { getAddProduct, postAddProduct, getProducts };
