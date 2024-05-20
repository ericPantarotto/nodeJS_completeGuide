import Product from '../models/product.js';

function getAddProduct(req, res, next) {
  return res.render('admin/edit-product', {
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

function getEditProduct(req, res, next) {
  const editMode = req.query.edit;
  if (!editMode) return res.redirect('/');

  return res.render('admin/edit-product', {
    pageTitle: 'Edit Product',
    path: '/admin/edit-product',
    editing: editMode,
  });
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

export default { getAddProduct, postAddProduct, getProducts, getEditProduct };
