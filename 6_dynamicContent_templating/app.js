import bodyParser from 'body-parser';
import express from 'express';

import path from 'path';
import { fileURLToPath } from 'url';

import adminData from './routes/admin.js';
import { expRouter as shopRoutes } from './routes/shop.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// NOTE: E  JS
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render('404', { pageTitle: 'Page Not Found', path: '' });
});

app.listen(3000);

// import adminRoutes from './routes/admin.js';
// app.use('/admin', adminRoutes);

// res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));

//NOTE: PUG
// app.set('view engine', 'pug');

//NOTE: handlebars
// import { engine } from 'express-handlebars';
// app.engine(
//   'hbs',
//   engine({
//     layoutsDir: 'views/layouts/',
//     defaultLayout: 'main-layout',
//     extname: 'hbs',
//   })
// );
// app.set('view engine', 'hbs');
// app.set('views', './views');