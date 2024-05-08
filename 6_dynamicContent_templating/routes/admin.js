import { Router } from 'express';

const router = Router();

const products = [];

router.get('/add-product', (req, res, next) =>
  res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
  })
);

router.post('/add-product', (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect('/');
});

export default {
  routes: router,
  products: products,
};

// export default router;
// export const expRouter = router;
// export const expProducts = products;

// res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
