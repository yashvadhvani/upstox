const onOHLCRecieve = () => {
  socket.on('OHLC', (data) => {
    console.log(data);
  });
};


const registerSocketEvents = () => {
  onOHLCRecieve();
};

const createSocket = () => {
  socket.on('connect', () => {
    console.log(socket);
  });
  registerSocketEvents();
};

$(document).ready(() => {
  createSocket();
});
