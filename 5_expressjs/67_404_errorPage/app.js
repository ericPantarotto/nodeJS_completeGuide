import bodyParser from 'body-parser';
import express from 'express';

import adminRoutes from './routes/admin.js';
import { expRouter as shopRoutes } from './routes/shop.js';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(adminRoutes);
app.use(shopRoutes);

app.use((req, res) => res.status(404).send('<h1>Page Not Found</h1>'));

app.listen(3000);

/* NOTE:
Remember that the request goes from top to bottom
so if it finds some middleware that handles it, it will end here

So to send a 404 error page, we simply have to add a catch all middleware at the bottom where we don't
need a path filter but we could add slash but that's the default anyways

you can actually chain all these method calls (seteader, status), send just has to be the last one.
*/
