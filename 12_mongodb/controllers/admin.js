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

// function getEditProduct(req, res, next) {
//   const editMode = req.query.edit;
//   if (!editMode) return res.redirect('/');

//   const prodId = req.params.productId;

//   req.user
//     .getProducts({ where: { id: prodId } })
//     .then(products => {
//       const product = products[0];
//       if (!product) return res.redirect('/');
//       res.render('admin/edit-product', {
//         pageTitle: 'Edit Product',
//         path: '/admin/edit-product',
//         editing: editMode,
//         product: product,
//       });
//     })
//     .catch(err => console.error(err));
// }

// function postEditProduct(req, res, next) {
//   const prodId = req.body.productId;
//   Product.findByPk(prodId)
//     .then(product => {
//       (product.title = req.body.title),
//         (product.imageUrl = req.body.imageUrl),
//         (product.description = req.body.description),
//         (product.price = req.body.price);
//       return product.save();
//     })
//     .then(result => {
//       console.log('UPDATED PRODUCT !!!');
//       res.redirect('/admin/products');
//     })
//     .catch(err => console.error(err));
// }

// function postDeleteProduct(req, res, next) {
//   const prodId = req.body.productId;
//   Product.destroy({ where: { id: prodId } }).then(result => {
//     console.log('DESTROYED PRODUCT!');
//     res.redirect('/admin/products');
//   });
// }

function getProducts(req, res, next) {
  Product.fetchAll()
    .then(products => {
      res.render('admin/products', {
        prods: products,
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
  // getEditProduct,
  // postEditProduct,
  // postDeleteProduct,
};
