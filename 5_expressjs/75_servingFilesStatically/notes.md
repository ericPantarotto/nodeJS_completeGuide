# Serving Files statically

>the convention is to call it public because you want to indicate that this is a folder that holds content which are always exposed to the public crowd or which is always exposed to the public, 

All your files in the Node.js project are not accessible by your users, if you ever tried to enter localhost and then something like views, shop.html, that will not work because this is simply accepted by express and it tries to find a route that matches this.

you can't access the file system  and that is of course good and what you want.

But now I actually want to make an exception, I want that some requests can just access the file system because ultimately let's say in shop.html, I want to have something like a link in here where I simply point at something like css, main.css,

>**<span style='color:   #875c5c'>important:** we need a feature expressjs offers us, we need to be able **to serve files statically** and ***statically simply means not handled by the express router or other middleware but instead directly forwarded to the file system.***  
>>And for this, we register a new middleware with app use and this this one expressjs ships with, therefore we use the express object itself,  
```js
app.use(express.static(path.join(__dirname, 'public')));
```

And here again we can construct this path with path join and then simply our dir name, so our root folder and then public because I want to grant access to the public folder in our current folder here.

*Express.js* will take any request that tries to find some file and it looks at the extension, so anything that tries to find a `.css` or a `.js` files, if we have such a request, it automatically forwards it to the **/public** folder and therefore then the remaining path has to be everything but that public,
```html
<link rel="stylesheet" href="/css/main.css">
```
**<span style='color:   #875c5c'>important:** you could register multiple static folders and it will funnel the request through all of them until it has a first hit for the file it's looking for.

and you're not just limited to css and javascript files, you can also serve images and so on.