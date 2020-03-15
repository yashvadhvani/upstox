const fs = require('fs');
const jsonData = JSON.parse(fs.readFileSync(`${__dirname}/files/trades.json`));

const seneca = require('seneca');
const config = require('./config/index');

const FSMMicroservice = seneca({ timeout: config.FSMMicroservice.timeout })
    .client(config.FSMMicroservice);


const send = (data, isLast = undefined) => new Promise((resolve, reject) => {
    FSMMicroservice.act({
        role: 'packet',
        cmd: 'send',
        data,
        isLast
    }, (err, res) => {
        if (err) {
            reject(err);
        } else {
            resolve(res);
        }
    });
});


jsonData.forEach(async (element, index) => {
    if(jsonData.length-1 === index ){
        await send(element, true);
    }
    await send(element)
});