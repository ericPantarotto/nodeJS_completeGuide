import express from 'express';

const app = express();

//  PART 1
// app.use((req, res, next) => {
//   console.log('middleware 1');
//   next();
// });

// app.use((req, res, next) => {
//   console.log('middleware 2');
//   res.send('<h1>assignement 2</h1>');
// });

//  PART 2
app.use('/users', (req, res, next) => {
  console.log('/users middleware');
  res.send('<h1>users  - Assignment 2</h1>');
});

app.use('/', (req, res, next) => {
  console.log('/ middleware');
  res.send('<h1>/ - assignement 2</h1>');
});

app.listen(3000);

/* NOTE: 
we would never reach /users middleware if it was not placed first , we always have to place more specific middlewarw first,
before less specific ones
*/