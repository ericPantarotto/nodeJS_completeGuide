# Serving HTML Files

in our routes files, whenever we use the `res.senfFile()` method, we have an error.  
The reason for this is that an absolute path would be correct, but slash `\`, actually refers to our root folder on our operating system,   not to this project folder.

So in order to construct the path to this directory and this file here ultimately, we can use a feature provided by **nodejs, another core module**. We can import the path core module by requiring `path`.

`Join()` yields us a path at the end, it returns a path but it constructs this path by concatenating the different segments.

Now the first segment we should pass here is then actually a **global variable** made available by nodejs: `__dir name`.
>**<span style='color:   #875c5c'>Important:** This is a global variable which simply holds the absolute path on our operating system to this project folder

Don't add  */* as use `path.join()`, using path join will automatically build the path in a way that works on *both Linux systems and Windows systems*.

>**<span style='color:   #875c5c'>Important:** With modern ES6 Modules, you can't use directly `__dirname`, instead:
```js
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
```
>[https://flaviocopes.com/fix-dirname-not-defined-es-module-scope/](https://flaviocopes.com/fix-dirname-not-defined-es-module-scope/)
