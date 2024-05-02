# Using a helper function for Navigation

>`path.dirname(require.main.filename);`  
This will refer to the main, well module that started your application, so basically to the module we created here in app.js, and now we can call file name to find out in which file this module was spun up.

So put in other words, this gives us the path to the file that is responsible for the fact that our application is running and this file name is what we put into dir name to get a path to that directory.

>**<span style='color:   #875c5c'>important:** for ES6 module, you have to use `path.dirname(process.argv[1]);`:  
*source*: [https://2ality.com/2022/07/nodejs-esm-main.html](https://2ality.com/2022/07/nodejs-esm-main.html)
*source*: [stackoverflow alternative-for-require-main-filename-using-es6-modules](https://stackoverflow.com/questions/72153742/alternative-for-require-main-filename-using-es6-modules)