# Installing Express.js

## Install
So let's now install expressjs by running ```npm install --save express```,  
Because this will be a **production dependency**. We don't just use that as a tool during development, it will be an integral part of the application we ship and therefore, it definitely also has to be installed on any server or any computer where we run our application once we deploy it.

We will also install nodemon as a dev-dependency:
```json
 "devDependencies": {
    "nodemon": "^3.1.0"
  },
  "dependencies": {
    "express": "^4.19.2"
  }
```
## Express package
If you hold ```Ctrl+ left mouse click``` on your the <ins>'express'</ins> area of your import ```import { express  } from 'express';```, you'll get to the **source code of Express.js**.

you can see that a function is exported at the end of the file:  
```export = e;```, note that it is a *Definition Typescript file (d.ts)*

>We have now initialized a new app constant/object  
```const app = express();```  
>>so a lot of logic is in this app constant here. Now the app here actually also happens to be a valid request handler, so you can pass app here to create server and if you do that and you run npm start, you will actually have a running server which of course will not handle any requests though because we haven't defined any logic that should happen for incoming requests app will basically not do anything at this point.  
```const server = createServer(app);```

Well almost, it does one thing for you and that is it sets up a certain way of handling incoming requests that defines or that is a key characteristic of expressjs

>HACK: it is important to import express.js as below  
`import  express  from 'express';`  
and not: `import  { express }  from 'express';`