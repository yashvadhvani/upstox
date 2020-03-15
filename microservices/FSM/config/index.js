const config = {};

config.webSocketMicroservice = {
  type: 'tcp',
  port: process.env.WEBSOCKET_MICROSERVICE_PORT || '4000',
  host: 'localhost',
  protocol: 'http',
  timeout: 360000,
};

config.FSMMicroservice = {
  type: 'tcp',
  port: process.env.FSM || '3000',
  host: 'localhost',
  protocol: 'http',
  timeout: 360000,
};

module.exports = config;