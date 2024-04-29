import { createServer } from 'http';

const server = createServer((req, res) => {
  console.log(
    `url: ${req.url}\n, method: ${req.method}\n, headers: ${req.headers}\n`,
    req.headers
  );

  res.setHeader('Content-Type', 'text/html');
  // INFO: below works in chunks / lines
  res.write('<html>');
  res.write('<head><title>My First Page</title></head>');
  res.write('<body<h1>Hello from my node.js Server!</h1></body>');
  res.write('</head>');
  res.end(); 
  //WARN: no change of the response object node.js will send back to the client after .end() method
});

server.listen(3000);

// INFO: chrome devTools / network, refresh and locahost entry : Headers, response tabs
// NOTE: that response can be sent in a simpler way by using the Express.js framework 