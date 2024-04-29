import { createServer } from 'http';

const server = createServer((req, res) => {
  console.log(
    `url: ${req.url}\n, method: ${req.method}\n, headers: ${req.headers}\n`
  , req.headers);
});

server.listen(3000);
