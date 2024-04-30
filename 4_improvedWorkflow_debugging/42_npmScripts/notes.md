# NPM Scripts
We have to use npm, npm stands for node package manager and it is installed together with nodejs

we can also use npm to initialize a so-called node project or to add some extra features to it to be precise because we obviously already got a node project here but now in this project, in a terminal navigated into this project, you can run npm init.

So with this what you get is this package.json file and there you also see all these settings or configurations you just set up and you can of course edit them there too,

JSON format; the keys are always put between double quotation marks and so are the values, 


with this configuration file, you'll see that we got a scripts section 

```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node app.js",
    "start-server": "node app.js"
  },
```
with other script names you have to pass: 'npm run *scriptName*'

start just is a special case which works with 'npm start' .