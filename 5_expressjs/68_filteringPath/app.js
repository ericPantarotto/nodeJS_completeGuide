import bodyParser from 'body-parser';
import express from 'express';

import adminRoutes from './routes/admin.js';
import { expRouter as shopRoutes } from './routes/shop.js';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res) => res.status(404).send('<h1>Page Not Found</h1>'));

app.listen(3000);

/* NOTE:
we add a segment as a filter in our app.use() using a Router, and all routes starting with
/admin will go into the admin route file

So this filtering mechanism here in app.js allows us to put a common starting segment for our
path which all routes in a given file use to outsource that into this app.js file so that we don't
have to repeat it for all the routes here.
*/ 