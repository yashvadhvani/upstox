const seneca = require('seneca');
const config = require('../config/index');

const webSocketMicroservice = seneca({ timeout: config.webSocketMicroservice.timeout })
    .client(config.webSocketMicroservice);


const emit = (OHLC) => new Promise((resolve, reject) => {
    webSocketMicroservice.act({
        role: 'socket',
        cmd: 'emit',
        OHLC,
    }, (err, res) => {
        if (err) {
            reject(err);
        } else {
            resolve(res);
        }
    });
});

module.exports = {
    emit
}