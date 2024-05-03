// import { fileURLToPath } from 'url';
import express from "express";
import path from "path";
import rootDir from '../util/path.js';

const router = express.Router();
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

router.get('/', (req, res, next) => {
    // res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'));
    res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});

export const expRouter = router;
