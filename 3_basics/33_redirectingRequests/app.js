import { writeFileSync } from 'fs';
import { createServer } from 'http';

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
    //HACK: we return here to make sure that the rest of the code below will not run and quit the function execution
    // and that is necessary cause after res.end() we cannot call anymore res.write() as it is the case below
  }
  if (url === '/message' && method === 'POST') {
    writeFileSync('message.txt', 'DUMMY');
    res.statusCode = 302;
    res.setHeader('Location', '/');
    return res.end();
    //HACK: we return here to make sure that the rest of the code below will not run and quit the function execution
    // and that is necessary cause after res.end() we cannot call anymore res.write() as it is the case below
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My First Page</title><head>');
  res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
  res.write('</html>');
  res.end();
});

server.listen(3000);

/* INFO:
The button will be of type submit so that it submits the form and that will be some default html behavior we're using here
where a button with type submit in a form element will send a new request 
form action will automatically target the host it's running on: localhost:3000
*/
