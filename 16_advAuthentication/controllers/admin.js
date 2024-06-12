import Product from '../models/product.js';

function getAddProduct(req, res, next) {
  // if (!req.session.isLoggedIn) return res.redirect('/login');
  return res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
  });
}

function postAddProduct(req, res, next) {
  new Product({
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    userId: req.session.user,
  })
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

  Product.findById(prodId)
    .then(product => {
      if (product.userId !== req.user._id) return res.redirect('/');
      product.title = req.body.title;
      product.price = req.body.price;
      product.description = req.body.description;
      product.imageUrl = req.body.imageUrl;
      return product.save().then(_ => {
        console.log('UPDATED PRODUCT !!!');
        res.redirect('/admin/products');
      });
    })
    .catch(err => console.error(err));
}

function postDeleteProduct(req, res, next) {
  const prodId = req.body.productId;

  // Product.findByIdAndDelete(prodId)
  Product.deleteOne({ _id: prodId, userId: req.user._id })
    .then(result => {
      if (result.deletedCount > 0) {
        console.log(result.deletedCount);
        console.log('DESTROYED PRODUCT in Products Collection!');
        Promise.resolve(req.user.removeFromCart(prodId)).then(_ => {
          console.log('DESTROYED PRODUCTin User Collection (cart.items)!');
        });
      }
      return res.redirect('/admin/products');
    })
    .catch(err => console.error(err));
}

function getProducts(req, res, next) {
  // Product.find({ userId: req.user._id })
  Product.find()
    // .populate('userId')
    .then(products => {
      res.render('admin/products', {
        prods: products.map(obj => ({ ...obj._doc, editing: true })),
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
