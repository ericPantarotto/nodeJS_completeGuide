import express from 'express';

import adminData from './admin.js';
const router = express.Router();

router.get('/', (req, res, next) =>
  res.render('shop', {
    prods: adminData.products,
    pageTitle: 'My Shop',
    path: '/',
    hasProducts: adminData.products.length > 0,
    activeShop: true,
    productCSS: true,
  })
);

export const expRouter = router;

// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'));

// console.log(adminData.products);
// res.sendFile(path.join(rootDir, 'views', 'shop.html'));
