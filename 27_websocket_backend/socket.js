import { Server } from 'socket.io';
import os from 'os';

let io;
function init(httpServer) {
  io = new Server(httpServer, {
    cors: {
      origin: `http://${
        process.env.WSL_DISTRO_NAME
          ? os.networkInterfaces()['eth0'][0].address || 'localhost'
          : os.networkInterfaces()['wlp0s20f3'][0].address
      }:3000`,
      methods: ['GET', 'POST'],
    },
  });
  return io;
}

function getIO() {
  if (!io) {
    throw new Error('Socket.io not initialized!');
  }
  return io;
}
export default {
  init,
  getIO,
};
