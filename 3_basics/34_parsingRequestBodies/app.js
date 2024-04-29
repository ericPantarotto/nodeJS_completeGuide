import { createServer } from 'http';
import { writeFileSync } from 'fs';

const server = createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Enter Message</title><head>');
    res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
    res.write('</html>');
    return res.end();
  }
  if (url === '/message' && method === 'POST') {
    const body = [];
    
    //NOTE: registering an event listener on our request, on allows to listen onto certain events; here, the data event
    //data event is fired as soon a new chunk is ready to be read
    req.on('data', (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    // NOTE: event listener that will fire when the incoming request is finished parsing
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString(); //nodeJS utility function
      const message = parsedBody.split('=')[1];
      writeFileSync('message.txt', message);
    });
    res.statusCode = 302;
    res.setHeader('Location', '/');
    return res.end();
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My First Page</title><head>');
  res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
  res.write('</html>');
  res.end();
});

server.listen(3000);
