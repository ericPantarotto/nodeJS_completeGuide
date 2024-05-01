import bodyParser from 'body-parser';
import express from 'express';

const app = express();

// FIX: request gives us this body convenience property here but by default, request doesn't try to parse the
// incoming request body. To do that, we need to register a parser and we do that by adding another middleware.
// INFO: you typically do that before your route handling middlewares
// INFO: 3rd party package: npm install --save body-parser
// we use that third party package which is the recommended way of using it because if they ever decide
// to pull it out of express again, this code will still work.
app.use(bodyParser.urlencoded({ extended: true })); // urlencoded() function registers/yields a middleware function, and this function will call next in the end

app.use('/add-product', (req, res, next) => {
  res.send(
    '<body><form action="/product" method="POST"><input type="text" name="title"><button type="submit">Send</button></form></body>'
  );
});

app.use('/product', (req, res, next) => {
  console.log(req.body); //HACK: this is a field added by express
  res.redirect('/'); //HACK: rather than setting the status code and setting the location header
});

app.use('/', (req, res, next) => {
  res.send('<h1>Hello from Express!</h1>');
});

app.listen(3000);

/*NOTE:
body-parser will not parse all kinds of possible bodies, files, json and so on but this will parse bodies
like the one we're getting here, sent through a form.

by the way if you install a new package, you need to restart, you can't rely on the auto-restart from nodemon
*/
