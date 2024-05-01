import express from 'express';
// import { createServer } from 'http';

const app = express();

// INFO: this does not mean that the full path, so the part after the domain has to be a slash,
// but that it has to start with that, so it will always apply
app.use('/', (req, res, next) => {
  console.log('This always runs!');
  next();
});

app.use('/add-product', (req, res, next) => {
  console.log('middleware add-product!');
  res.send('<h1>The "Add Product" Page</h1>');
});

// app.use('/', (req, res, next) => {
//   console.log('/ middleware!');
//   res.send('<h1>Hello from Express!</h1>');
// });

app.listen(3000);

/* NOTE:
This is how we can use that middleware approach to control what is getting shown;
and the order here as well as the fact whether we are calling next or not matters a lot. 

if you are sending a response, this is a good indication that you never want to call next too because
you don't want to execute any other response related code just as before with vanilla nodejs,
you don't want to send more than one response, this won't work and will result in an error.

and if we have a middleware that should be applied to all requests, we would simply add it on top of
all the other middlewares.
and if we call the next function, well then of course the request will also be able to continue.
*/
