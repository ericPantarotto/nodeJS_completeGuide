import Product from '../models/product.js';

function getAddProduct(req, res, next) {
  return res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    // editing: false
  });
}

function postAddProduct(req, res, next) {
  new Product(
    null, //INFO: id
    req.body.title,
    req.body.imageUrl,
    req.body.description,
    req.body.price
  )
    .save()
    .then(_ => res.redirect('/'))
    .catch(err => console.log(err));
}

function getEditProduct(req, res, next) {
  const editMode = req.query.edit;
  if (!editMode) return res.redirect('/');

  const prodId = req.params.productId;
  Product.findById(prodId, product => {
    if (!product) return res.redirect('/');
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product,
    });
  });
}

function postEditProduct(req, res, next) {
  const prodId = req.body.productId;
  new Product(
    prodId,
    req.body.title,
    req.body.imageUrl,
    req.body.description,
    req.body.price
  ).save();
  res.redirect('/admin/products');
}

function postDeleteProduct(req, res, next) {
  const prodId = req.body.productId;
  Product.deleteById(prodId);
  res.redirect('/admin/products');
}

function getProducts(req, res, next) {
  Product.fetchAll(products => {
    const prodsEditing = products.map(obj => {
      return { ...obj, editing: true };
    });

    res.render('admin/products', {
      prods: prodsEditing,
      pageTitle: 'My Shop',
      path: '/admin/products',
    });
  });
}

export default {
  getAddProduct,
  postAddProduct,
  getProducts,
  getEditProduct,
  postEditProduct,
  postDeleteProduct,
};
