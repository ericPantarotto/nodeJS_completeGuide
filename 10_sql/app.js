import bodyParser from 'body-parser';
import express from 'express';
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';

import errorController from './controllers/error.js';
import adminRoutes from './routes/admin.js';
import { expRouter as shopRoutes } from './routes/shop.js';
import { expPool as db } from './util/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const [results, fields] = await db.query('SELECT user FROM mysql.user;');
console.log(results); // results contains rows returned by server
console.log(fields); // fields contains extra meta data about results, if available

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes.routes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);
