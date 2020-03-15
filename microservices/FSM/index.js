require('dotenv').config({ path: '.env' });

let seneca = require('seneca');
const config = require('./config/index');

seneca = seneca({ timeout: config.FSMMicroservice.timeout });
const logger = require('./lib/logger');
const trade = require('./services/index');

logger.init();
seneca.use(trade);

seneca.listen(config.FSMMicroservice);
logger.info(`Started WebSocket micro-service on port: ${config.FSMMicroservice.port}`);