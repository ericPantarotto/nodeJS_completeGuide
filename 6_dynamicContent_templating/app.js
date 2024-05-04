import bodyParser from 'body-parser';
import express from 'express';

import path from 'path';
import { fileURLToPath } from 'url';

import adminData from './routes/admin.js';
import { expRouter as shopRoutes } from './routes/shop.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render('404', { pageTitle: 'Page Not Found' });
});

app.listen(3000);

// import adminRoutes from './routes/admin.js';
// app.use('/admin', adminRoutes);

// res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));