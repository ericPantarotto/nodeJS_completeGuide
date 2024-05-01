import { createServer } from 'http';

import { handler, someText } from './routes.js';

console.log(someText);

const server = createServer(handler);

server.listen(3000);

// NOTE: https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export
// NOTE: https://www.digitalocean.com/community/tutorials/understanding-modules-and-import-and-export-statements-in-javascript
// NOTE: https://bootcamp.uxdesign.cc/named-export-vs-default-export-in-es6-a2370b062f17