const createBody = url => {
  if (url === '/') {
    return `<body><h1>Hello from my Node.js Assignment Exercise!</h1>
     <form action="/create-user" method="POST"><input type="text" name="message"><button type="submit">User Name</button></form></body>`;
  }

  if (url === '/users') {
    return `<body><h1>It's a user lists!</h1>
     <ul><li>user 1</li><li>user 2</li><li>user 3</li></ul></body>`;
  }

  return `<body><h1>Default page from my Node.js Server!</h1></body>`;
};

const handleCreateuser = (req, res) => {
  const body = [];
  req.on('data', chunk => {
    body.push(chunk);
  });
  return req.on('end', () => {
    const parsedBody = Buffer.concat(body).toString();
    const userName = parsedBody.split('=')[1];
    console.log(userName);
    //INFO: indicating to the browser where to redirect
    res.statusCode = 302;
    res.setHeader('Location', '/users');
    return res.end();
  });
};

const requestHandler = (req, res) => {
  const { url, method } = req;
  if (url === '/create-user' && method === 'POST') {
    return handleCreateuser(req, res);
  }

  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write(createBody(url));
  res.write('</html>');
  res.end();
};

export const handler = requestHandler;
