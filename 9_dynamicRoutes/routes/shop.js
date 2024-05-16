import express from 'express';
import shopController from '../controllers/shop.js';

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);

router.get('/cart', shopController.getCart);

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

export const expRouter = router;

// import adminData from './admin.js';
// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'));

// console.log(adminData.products);
// res.sendFile(path.join(rootDir, 'views', 'shop.html'));
