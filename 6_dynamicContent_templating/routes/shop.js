import express from "express";
import path from "path";
import rootDir from '../util/path.js';
import adminData from './admin.js';

const router = express.Router();

router.get('/', (req, res, next) => {
    console.log(adminData.products);
    res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});

export const expRouter = router;

// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'));