import { createServer } from 'http';
const server = createServer((req, res) => {
  res.end('Hello world from Node.js!');
});

server.listen(3000);
//NOTE: http://192.168.1.30:3000/
