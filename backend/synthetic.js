const data = require('./data');

module.exports = socket => {
    let interval = 100;

    setInterval(async () => {
        data.arduinoReceiver('Flow|' + (Math.sin(Date.now() / 1000) * 100), socket);
        data.arduinoReceiver('RoomTemp|' + (Math.random() * 5 + 20), socket);
    }, interval);
};
