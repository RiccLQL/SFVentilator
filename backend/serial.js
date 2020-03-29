const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

require('./data');

async function getArduinoPort() {
    const ports = await SerialPort.list();
    for (const port of ports) {
        const pm = port.manufacturer;
        if (typeof pm !== 'undefined' && pm.includes('arduino')) {
            return port.comName.toString();
        }
    };
    return null;
}

async function setupArduino(socket) {
    const portName = await getArduinoPort();
    const port = new SerialPort(portName, { baudRate: 115200 });
    const parser = port.pipe(new Readline({ delimeter: '\n' }));

    port.on('open', () => console.log('[ARD] Connected to Arduino via serial port'));
    port.on('close', () => console.log('[ARD] Disconnected from Arduino'));
    port.on('error', error => {
        console.log(error);
        console.log('[ARD] Error thrown from Arduino serial port');
    });

    parser.on('data', data => {
        console.log('[ARD] Received data from Arduino: ' + data)
        let [name, value] = data.split('|');
    });
}

module.exports = setupArduino;