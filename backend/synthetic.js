const data = require('./data');

module.exports = socket => {
    setInterval(async () => {
        data.arduinoReceiver('FiO2|' + (Math.tan(Date.now() / 1000) * 10), socket);
        data.arduinoReceiver('LungPress|' + (Math.cos(Date.now() / 1000) * 100), socket);
        data.arduinoReceiver('VT|' + (Math.random() * 5 + 20), socket);
        data.arduinoReceiver('Hum|' + (Math.random() * 5 + 20), socket);
    }, 20);

    setTimeout(async () => {
        //data.arduinoReceiver('HumAlarm|1', socket);
    }, 4000);
};