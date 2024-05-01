import bodyParser from 'body-parser';
import express from 'express';

import adminRoutes from './routes/admin.js';
import { expRouter as shopRoutes } from './routes/shop.js';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(adminRoutes);
app.use(shopRoutes);


app.listen(3000);

/* NOTE:
we want to basically export our logic in different files and import it into this file.

We could do this, we could create files where we export these functions (app.use(), app.post()) but expressjs actually gives
us a pretty nice way of outsourcing routing into other files.

I'll add a new folder which I'll name routes (conventio, can be named differently)

This router is like a mini express app tied to the other express app or pluggable into the other express app
I'll say which we can export, and set it equal to the router.

Now just before, the order matters 

HACK: app.get() will do an exact match! unlike app.use(), this has nothing to do with the app.router we are now using
now if I enter some random endpoint, I actually get an error because now I got no single middleware that URL
*/