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
    req.body.title,
    req.body.price,
    req.body.description,
    req.body.imageUrl
  )
    .save()
    .then(_ => {
      console.log('CREATED PRODUCT!');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
}

function getEditProduct(req, res, next) {
  const editMode = req.query.edit;
  if (!editMode) return res.redirect('/');

  const prodId = req.params.productId;

  Product.findById(prodId)
    .then(product => {
      if (!product) return res.redirect('/');
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product,
      });
    })
    .catch(err => console.error(err));
}

function postEditProduct(req, res, next) {
  const prodId = req.body.productId;
  new Product(
    req.body.title,
    req.body.price,
    req.body.description,
    req.body.imageUrl,
    prodId
  )
    .save()
    .then(_ => {
      console.log('UPDATED PRODUCT !!!');
      res.redirect('/admin/products');
    })
    .catch(err => console.error(err));
}

function postDeleteProduct(req, res, next) {
  const prodId = req.body.productId;
  Product.deleteById(prodId).then(_ => {
    console.log('DESTROYED PRODUCT!');
    res.redirect('/admin/products');
  });
}

function getProducts(req, res, next) {
  Product.fetchAll()
    .then(products => {
      res.render('admin/products', {
        prods: products.map(obj => ({ ...obj, editing: true })),
        pageTitle: 'My Shop',
        path: '/admin/products',
      });
    })
    .catch(err => console.log(err));
}

export default {
  getAddProduct,
  postAddProduct,
  getProducts,
  getEditProduct,
  postEditProduct,
  postDeleteProduct,
};
