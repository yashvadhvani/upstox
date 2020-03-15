
const server = require('http').createServer();
const logger = require('./lib/logger');

const io = require('socket.io')(server, {
  path: '/',
  serveClient: false,
  // below are engine.IO options
  pingInterval: 0,
  pingTimeout: 5000,
  cookie: false
});


io.on('connection', (socket) => {
  socket.on('disconnect', (data) => {
    console.log(`socket disconnected: ${data}`);
  });

  socket.on('postOHLC', (data) => {
    logger.info(JSON.stringify(data, null, 2));
    io.sockets.emit('OHLC', data);
  })

  console.log('Connected');
});

server.listen(4000);