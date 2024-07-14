import bodyParser from 'body-parser';
import 'dotenv/config';
import express from 'express';
import { connect } from 'mongoose';
import multer from 'multer';
import os from 'os';
import path from 'path';
// import { Server } from 'socket.io';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

import { expRouter as authRoutes } from './routes/auth.js';
import feedRoutes from './routes/feed.js';
import  ioSocket from "./socket.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'images'),
  filename: (req, file, cb) => cb(null, uuidv4() + '-' + file.originalname),
});
const fileFilter = (req, file, cb) => {
  const filterArray = ['image/png', 'image/jpg', 'image/jpeg'];
  filterArray.includes(file.mimetype) ? cb(null, true) : cb(null, false);
};

app.use(bodyParser.json());

app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/feed', feedRoutes.routes);
app.use('/auth', authRoutes);

app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.statusCode || 500).json({
    message: error.message,
    data: error.data,
  });
});

connect(process.env.MONGO_DB_URL)
  .then(_ => {
    const server = app.listen(8080);

    server.on('listening', function () {
      console.log(
        'Express server started \nplatform: %s \nhost: %s \nport: %s',
        process.platform,
        process.platform === 'linux' && process.env.WSL_DISTRO_NAME
          ? os.networkInterfaces()['eth0'][0].address || 'localhost'
          : os.networkInterfaces()['wlp0s20f3'][0].address,
        server.address().port
      );
    });

    // const io = new Server(server, {
    //   cors: {
    //     origin: `http://${
    //       process.env.WSL_DISTRO_NAME
    //         ? os.networkInterfaces()['eth0'][0].address || 'localhost'
    //         : os.networkInterfaces()['wlp0s20f3'][0].address
    //     }:3000`,
    //     methods: ['GET', 'POST'],
    //   },
    // });
    const io = ioSocket.init(server);
    
    io.on('connection', socket => {
      console.log('a user connected');
      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
    });
  })
  .catch(err => console.error(err));
