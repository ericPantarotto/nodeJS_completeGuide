# Model View Controller (MVC)

## What does MVC mean?

### Separation of concerns

![image info](./sc1.png)

It's all about a separation of concerns, so making sure that different parts of your code do different things and you clearly know which part is responsible for what

- Models:  
    so things like saving data, fetching data to or from a file or even if it's just in memory as we're currently doing it

- Views:  
    The views are responsible for what the user sees in the end, they are responsible for rendering the right content in our html documents and sending that back to the user, so they are decoupled from your application code and are just having some light or minor integrations regarding the data we inject into our templating engine to generate these views

- Controllers:  
    And the controllers are now the connection point between the models and your views because since the views shouldn't care about the application logic and the models do care about how to save and fetch data and so on,  
    The controllers are the thing working with the models, saving that data or triggering that save process and so on, and also the part where they then pass that data that was fetched to your views
    
    **So the controller is the middleman, it contains the in-between logic.**

    Routes are basically the things which define upon which path for which http method which controller code should execute. The controller is then the thing defining with which model to work and which view to render

**<span style='color: #bcdbf9'> Note:**  in an app with express or built with express as we are doing it which heavily relies on this middleware concept, the controllers are also kind of split up across middleware functions or some of the logic might be separated and moved into another middleware function 

## Adding Controllers
**<span style='color:   #875c5c'>Important:** [https://stackoverflow.com/questions/33178843/es6-export-default-with-multiple-functions-referring-to-each-other](https://stackoverflow.com/questions/33178843/es6-export-default-with-multiple-functions-referring-to-each-other)
  
So therefore you could of course say well we already got controllers, these two files hold our controller logic and you would be right.

but as our application grows if you put everything into your route files, this can quickly become a very big file and therefore separating this into separate files can be a good idea.

>you can then quickly see which routes you have and if you want to see the code which executes per route, you simply go into the respective controller file and function.

**<span style='color: #a8c62c'> /controllers/products.js:** 
```js
function getAddProduct(req, res, next) {
  return res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
  });
}

export default { getAddProduct };
```
**<span style='color: #a8c62c'> /routes/admin.js:**  
**<span style='color: #bcdbf9'>  Note:** we don't execute our imported function from `/controllers/`, we just pass a reference to this function: So we're just telling the express router that it should take this function and store it and whenever a request reaches this route, it should go ahead and execute it.
```js
import  productsController  from "../controllers/products.js";
router.get('/add-product', productsController.getAddProduct);
```

## Adding a Product Model
**<span style='color: #bcdbf9'>  Note:**  whilst this might look more complicated right now and it certainly is because we're just using our dummy storage here, this is great once you really got more complex models with more fields, with more methods and where you don't store them in some random array but where you got the whole database connection logic

**<span style='color: #a8c62c'> /models/product.js:**  
```js
const products = [];

class Product {
  constructor(title) {
    this.title = title;
  }
  save() {
    products.push(this);
  }

  static fetchAll() {
    return products;
  }
}

export default Product;
```

**<span style='color: #a8c62c'> /controllers/products.js:**  
**<span style='color:   #875c5c'>Important:** convention is to use Capital letter for ES6 classes *import Product...*:
```js
import Product from '../models/product.js';

function postAddProduct(req, res, next) {
  new Product(req.body.title).save();
  res.redirect('/');
}

function getProducts(req, res, next) {
  res.render('shop', {
    prods: Product.fetchAll(),
    pageTitle: 'My Shop',
    path: '/',
  });
}
``` 

## Storing data in files via the Model
**<span style='color: #a8c62c'> /models/product.js:**

- construct the path where to save the file
- we retreive the existing content using `readFile()` and parse it if no error, otherwise contine; using an `if(!err)` block. 
  - for very big files, there are more efficient ways because you don't want to read them all into memory before you work with them, you can read them as a stream 
- add the new product and write the file in `.json` format.

Make the necessary imports:
```js
import { readFile, writeFile } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
```
**<span style='color: #bcdbf9'>  Note:**  we push `this`; **the class**, and this works as we're using arrow function  
```js
 save() {
    const p = path.join(path.dirname(__dirname), 'data', 'products.json');

    readFile(p, (err, fileContent) => {
      let products = [];
      if (!err) {
        products = JSON.parse(fileContent);
      }
      products.push(this);
      writeFile(p, JSON.stringify(products), () =>  {});
    });
  }
```
**<span style='color: #bcdbf9'>  Note:** `writeFile(p, JSON.stringify(products), () =>  {});` `fs.writeFile()` takes 3 arguments: the path, the buffer to write, and an error callback  
as an alternative to pass a standard callback; `err => console.log(err)`, we pass an empty callback `() => {}`

**<span style='color:   #875c5c'>Important:** you must add the below lines in the `package.json` to avoid **nodemon** server restarting each time the `/data/products.json` changes!
```json
  "nodemonConfig": {
    "ignore": [
      "data/products.json"
    ]
  }
```

## Fetching data in files via the Model
**<span style='color:   #875c5c'>Important:** This line of code is asynchronous:  
`fs.readFile()`  
So my fetch all method here executes the line of code, and as you learned, it simply registers this callback in its event emitter registry but then it just finishes with this function and this function itself does not return anything.   
**so fetch all does not return anything**, it returns **undefined** therefore and hence in my view, we get various errors.

>**<span style='color: #cc9464'> HACK:**   I will simply accept an argument in `fetchAll()` and that's a callback function.  
and that actually allows me to pass a function into `fetchAll()`, which it will execute once it is done.  

>alternative would be to promisify the `fs.readFile()` function and use `.then()`. Note that async/await is not provided out of the box from `fs`  
[https://www.geeksforgeeks.org/how-to-operate-callback-based-fs-writefile-method-with-promises-in-node-js/](https://www.geeksforgeeks.org/how-to-operate-callback-based-fs-writefile-method-with-promises-in-node-js/)

**<span style='color: #a8c62c'> /models/product.js:**
```js
 static fetchAll(cb) {
    const p = path.join(path.dirname(__dirname), 'data', 'products.json');

    readFile(p, (err, fileContent) => {
      if (err) {
        return cb([]);
      }
      return cb(JSON.parse(fileContent));
    });
  }
```
**<span style='color: #a8c62c'> /controllers/products.js:**  
I now simply have to pass in an **anonymous function** to `fetchAll()`, the required callback function; in our case `res.render(...)`  
```js
function getProducts(req, res, next) {
  Product.fetchAll(products => {
    res.render('shop', {
      prods: products,
      pageTitle: 'My Shop',
      path: '/',
    });
  });
}
```

`fetchAll()` takes a function it should execute once it's done and once it's done, we get the products.

## Refactoring the file storage code

we will create a helper function that  will do:
- path construction here for me 
- it will also read the file, so it will basically do everything of `fetchAll()`, 
- it will even get my callback as an argument

>**<span style='color:   #875c5c'>Important:**  make sure to always use arrow functions so that this never loses its context and always refers to the class and therefore to the object based on the class

**<span style='color: #bcdbf9'>  Note:** 
- we create an internal helper function in our **<span style='color: #a8c62c'> /models/product.js:** 
- in this helper function, when there are products, we return two arguments to the callback functions
  - the products read from file 
  - **the path that `writeFile()` will take in the `save()` method** (alternative would be to create p as a global property)

```js
const _getProductsFromFile = cb => {
  const p = path.join(path.dirname(__dirname), 'data', 'products.json');

  readFile(p, (err, fileContent) => {
    if (err) {
      return cb([]);
    }
    return cb(JSON.parse(fileContent), p);
  });
};
```
in the save method, we are doing more or less the same logic as fetchAll, we just need to add the logic/callback to be executed when our `_getProductsFromFile()` has finished:
- adding the new product
- writing the file
```js
 save() {
    _getProductsFromFile((products, pathFromCallback) => {
      products.push(this);
      writeFile(pathFromCallback, JSON.stringify(products), () => {});
    });
  }
```

## Wrap-up
![image info](./sc2.png)