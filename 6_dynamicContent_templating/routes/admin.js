import { Router } from 'express';
import path from 'path';

import rootDir from '../util/path.js';

const router = Router();

const products = [];

router.get('/add-product', (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

router.post('/add-product', (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect('/');
});

// export default router;

// export const expRouter = router;
// export const expProducts = products;

export default {
  routes: router,
  products: products,
};
