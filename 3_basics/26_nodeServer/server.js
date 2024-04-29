import { createServer } from 'http';

const server = createServer((req, res) => {
  console.log(req);
});

server.listen(3000);
