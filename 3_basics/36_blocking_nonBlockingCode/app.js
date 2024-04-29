import { createServer } from 'http';
import { writeFile, writeFileSync } from 'fs';

const server = createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Enter Message</title><head>');
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
    );
    res.write('</html>');
    return res.end();
  }
  if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', chunk => {
      console.log(chunk);
      body.push(chunk);
    });
    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      // WARN: writeFileSync will block execution until the file is created, then the next line and all the other code will not continue to run until that file operation is done
      // and even new incoming requests of other users would not be handled until that file operation is done
   
      // FIX: for huge file of several Mbs
      // NOTE: the writeFile function takes a 3rd argument, a callback function that takes an error argument, which will be null when if no error occured
      // response should only be sent once the message is parsed
      writeFile('message.txt', message, err => {
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
    });
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My First Page</title><head>');
  res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
  res.write('</html>');
  res.end();
});

server.listen(3000);

/* NOTE:
we have yet another event listener, this nested function here which will be executed once we're done writing the file

this is actually pretty standard for nodejs.
You have this event driven architecture where you basically tell nodejs please do something andit will then go ahead 
and offload that process to the operating system which does use multi-threading and will then continue its event loop 
to listen for event callbacks and always just dispatch tiny actions like that to never block the code execution 
and then always just come back once an operation is done by the operating system and so on

So this is what nodejs does here and why it is high performant because it never blocks your code, it never blocks the server,

it just goes ahead and tells the operating system do that, do this and then eventually comes back and does something in the callback
*/