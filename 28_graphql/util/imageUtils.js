import { unlink } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

function clearImage(filePath) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  unlink(path.join(__dirname, '..', filePath), err => console.error(err));
}

export default {
  clearImage,
};
