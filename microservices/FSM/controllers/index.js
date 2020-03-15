const socket = require('socket.io-client')('http://localhost:4000');
socket.on('connect', (data) => {
    console.log('Connected');
});

let bar = {
};

let time = {
};

const startInterval = (sym) => {
    const OHLC = {
        ...bar[sym],
        ...time[sym]
    }
    bar[sym].num++;
    bar[sym].open = null;
    bar[sym].high = null;
    bar[sym].low = null;
    bar[sym].close = null;
    time[sym].start = time[sym].end;
    time[sym].end = time[sym].end + 15000000000;
    socket.emit('postOHLC',OHLC);
}

const checkBar = (price, sym) => {
    if (bar[sym].open === null) {
        bar[sym].open = bar[sym].high = bar[sym].low = bar[sym].close = price;
    } else {
        if (price > bar[sym].high) {
            bar[sym].high = price;
        }   
        else if (price < bar[sym].low) {
            bar[sym].low = price;
        }
        bar[sym].close = price;
    }
}

const checkEnd = (timeStamp, isLast) =>{
    Object.keys(bar).forEach((element) => {
        if(isLast || timeStamp >= time[element].end){
            startInterval(element);
        } 
    });
    return true;
}

const trade = (args, callback) => {
    const record = args.data;
    const sym = record.sym;
    checkEnd(record.TS2, args.isLast);
    if (bar[sym]) {
        if (bar[sym].open == null) {
            bar[sym].open = bar[sym].high = bar[sym].low = bar[sym].close = record.P;
        } else if (record.TS2 >= time[sym].start && record.TS2 <= time[sym].end) {
            checkBar(record.P, sym);
        } else {
            startInterval(sym);
        }
        callback(null, {
            trade: 'Success'
        });
    } else {
        time[sym] = {};
        bar[sym] = {};
        time[sym].start = record.TS2;
        time[sym].end = record.TS2 + 15000000000;
        bar[sym].num = 1;
        bar[sym].open = bar[sym].high = bar[sym].low = bar[sym].close = record.P;
        callback(null, { trade: 'Success' });
    }
}

module.exports = {
    trade,
}