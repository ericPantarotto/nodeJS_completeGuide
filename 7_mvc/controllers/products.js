const products = [];

function getAddProduct(req, res, next) {
  return res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
  });
}

function postAddProduct(req, res, next) {
  products.push({ title: req.body.title });
  res.redirect('/');
}

function getProducts(req, res, next) {
  res.render('shop', {
    prods: products,
    pageTitle: 'My Shop',
    path: '/',
  });
}

export default { getAddProduct, postAddProduct, getProducts };
