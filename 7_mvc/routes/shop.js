import express from 'express';
import productsController from '../controllers/products.js';

const router = express.Router();

router.get('/', productsController.getProducts);

export const expRouter = router;

// import adminData from './admin.js';
// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'));

// console.log(adminData.products);
// res.sendFile(path.join(rootDir, 'views', 'shop.html'));
