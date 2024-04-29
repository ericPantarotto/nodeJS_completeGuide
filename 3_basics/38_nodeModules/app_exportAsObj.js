import { createServer } from 'http';

import { routesObj } from './routes_importAsObj.js';

console.log(routesObj.someText);

const server = createServer(routesObj.handler);

server.listen(3000);

// NOTE: https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export
// NOTE: https://www.digitalocean.com/community/tutorials/understanding-modules-and-import-and-export-statements-in-javascript
