const data = require('./data');

module.exports = socket => {
    setInterval(async () => {
        data.arduinoReceiver('FiO2|' + (Math.tan(Date.now() / 1000) * 10), socket);
        data.arduinoReceiver('LungPress|' + (Math.cos(Date.now() / 1000) * 100), socket);
        data.arduinoReceiver('RoomTemp|' + (Math.random() * 5 + 20), socket);
    }, 50);
};
