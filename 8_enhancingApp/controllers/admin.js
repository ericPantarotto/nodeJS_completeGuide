import Product from '../models/product.js';

function getAddProduct(req, res, next) {
  return res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
  });
}

function postAddProduct(req, res, next) {
  new Product(
    req.body.title,
    req.body.imageUrl,
    req.body.description,
    req.body.price
  ).save();
  res.redirect('/');
}

function getProducts(req, res, next) {
   Product.fetchAll(products => {
     res.render('admin/products', {
       prods: products,
       pageTitle: 'My Shop',
       path: '/admin/products',
     });
   });
}

export default { getAddProduct, postAddProduct, getProducts };
