// const fs = require('fs').promises
import fs from 'fs/promises';

const text = 'This is a test = and it should be stored in a file!';

fs.writeFile('node-message.txt', text)
  .then(_ => console.log('Success: Wrote to file!'))
  .catch(err => console.error(err));
