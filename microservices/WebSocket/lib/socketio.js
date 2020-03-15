const io = require('socket.io')();

const emit = (data) => {
  io.emit(data.message.eventType, data.message.data);
};

io.on('connection', (socket) => {
  socket.on('disconnect', (data) => {
    console.log(`socket disconnected: ${data}`);
  });
});

module.exports = {
  io,
  emit
};
