import Product from '../models/product.js';

function getAddProduct(req, res, next) {
  return res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    // editing: false
  });
}

function postAddProduct(req, res, next) {
  req.user
    .createProduct({
      title: req.body.title,
      price: req.body.price,
      imageUrl: req.body.imageUrl,
      description: req.body.description,
    })
    .then(result => {
      console.log('CREATED PRODUCT!');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
}

function getEditProduct(req, res, next) {
  const editMode = req.query.edit;
  if (!editMode) return res.redirect('/');

  const prodId = req.params.productId;

  req.user
    .getProducts({ where: { id: prodId } })
    .then(products => {
      const product = products[0];
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
  Product.findByPk(prodId)
    .then(product => {
      (product.title = req.body.title),
        (product.imageUrl = req.body.imageUrl),
        (product.description = req.body.description),
        (product.price = req.body.price);
      return product.save();
    })
    .then(result => {
      console.log('UPDATED PRODUCT !!!');
      res.redirect('/admin/products');
    })
    .catch(err => console.error(err));
}

function postDeleteProduct(req, res, next) {
  const prodId = req.body.productId;
  Product.destroy({ where: { id: prodId } }).then(result => {
    console.log('DESTROYED PRODUCT!');
    res.redirect('/admin/products');
  });
}

function getProducts(req, res, next) {
  req.user
    .getProducts()
    .then(products => {
      const prodsEditing = products.map(obj => {
        return { ...obj['dataValues'], editing: true };
      });

      res.render('admin/products', {
        prods: prodsEditing,
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
