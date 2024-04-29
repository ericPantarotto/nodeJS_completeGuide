# Creating a Node Server
common practise to name the main file :  server.js or app.js because it is the root file that makes up your nodejs application, so the nodejs code you will execute on a computer in the cloud on a server in the end the way javascript works both for the browser and nodejs,

there is a handful of functions and objects we can use globally without importing anything into the file but generally, most functionalities aren't available by default, to not pollute our global namespace with all these reserved keywords and names

core modules: http, https, fs, path, os 

http helps us with launching a server or also with other tasks like sending requests because a node app  could also send a request to another server,

Https would be helpful when we want to launch an ssl encoded server, so where all that data which is transferred is encrypted

when importing file, 'require' automatically adds .js at the end, you don't need to add that on your own but you can.

function listen()  as you can see takes a couple of arguments, optional arguments, the first one is the port on which you want to listen. Now in production you typically would not fill this out and  it would take the default of port 80 but here on local development, we want to use a different port and you can also define a hostname.

>INFO:  The cursor here in the terminal doesn't go back in a new line because this process here is now still running, it didn't finish, this file execution didn't finish because we now get an ongoing looping process where this will keep on listening for requests

when I started out with nodejs years ago, it was difficult to understand that coming from a PHP background you suddenly write your own server, that sounded like something super complex. Well actually it's just these few lines