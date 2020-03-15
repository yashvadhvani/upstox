const socketio = require('../lib/socketio');
const logger = require('../lib/logger');


const emitEvent = (args, callback) => {
    logger.info(JSON.stringify(args.OHLC, null, 2));
    socketio.emit({
        message: {
            eventType: 'OHLC',
            data: args.OHLC,
        }
    });
    callback(null, {
        success: true,
    })
}

module.exports = {
    emitEvent
}