import { validationResult } from 'express-validator';
import { ObjectId } from 'mongodb';
import Product from '../models/product.js';

function getAddProduct(req, res, next) {
  // if (!req.session.isLoggedIn) return res.redirect('/login');
  return res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
  });
}

function postAddProduct(req, res, next) {
  const editMode = req.query.edit;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: {
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
      },
      hasError: true,
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array(),
    });
  }

  new Product({
    //HACK: to test 500 page
    _id: ObjectId.createFromHexString('666417a11967e5424e491328'),
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
    // .catch(err => console.log(err));
    // .catch(_ => res.redirect('/500'));
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
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
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
}

function postEditProduct(req, res, next) {
  const prodId = req.body.productId;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: true,
      product: {
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        _id: prodId,
      },
      hasError: true,
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array(),
    });
  }

  Product.findById(prodId)
    .then(product => {
      if (product.userId.toString() !== req.user._id.toString())
        return res.redirect('/');
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
  // Product.find()
  Product.find({ userId: req.user._id })
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
