const fs = require('fs');

const csv = require('./csv');

const unsureMessage = (name, value) => console.log(`[ARD] Unsure how to process data with name "${name}" and value ${value}`);

const nexts = {
    toArduino: (n, v, sendToArduino) => sendToArduino(n, v),
    toReact: (n, v, socket) => socket.emit(n, v),
};

async function mutateNoCollect(name, value, direction, extra) {
    if (data.hasOwnProperty(name)) {
        try {
            data[name] = value;
            csv.addToCsv(name, value, Date.now(), direction);
            nexts[direction](name, value, extra);
        } catch (e) { console.log(e); }
    } else
        unsureMessage(name, value);
}

async function mutateCollect(name, value, direction, extra) {
    if (data.hasOwnProperty(name)) {
        let timestamp = Date.now();
        let nextDatum = { value, timestamp, };

        data[name] = [...data[name], nextDatum];
        csv.addToCsv(name, value, timestamp, direction);
        nexts[direction](name, nextDatum, extra);
    } else
        unsureMessage(name, value);
}

const noCollect = [
    'BattLowWarn', 'Hum', 'HumAlarm', 'HumWarn', 'Pexhale', 'PexWarn',
    'Pinhale', 'PinWarn', 'O2inLowAlarm', "RoomTemp", 'RR', 'ValveBlockedAlarm', 'VT',
];
const collect = ["FiO2", "LungPress"];

let tempStorage = {};
async function arduinoReceiver(data) {
    let [name, value] = data.split('|');

    if (noCollect.includes(name))
        tempStorage[name] = parseFloat(value);
    else if (collect.includes(name)) {
        if (!tempStorage.hasOwnProperty(name))
            tempStorage[name] = [];
        tempStorage[name] = [...tempStorage[name], parseFloat(value)];
    } else
        unsureMessage(name, value);
}

async function setUpPipe(socket) {
    setInterval(() => {
        Object.entries(tempStorage).forEach(([name, value]) => {
            if (noCollect.includes(name))
                mutateNoCollect(name, value, 'toReact', socket);
            else if (collect.includes(name))
                mutateCollect(name, value.reduce((acc, next) => next / value.length + acc, 0), 'toReact', socket);
            else
                unsureMessage(name, value);
        });
        tempStorage = {};
    }, 200);
}

async function reactReceiver(socket, sendToArduino) {
    // NON-PERSISTENT/PATIENT-SPECIFIC SETTINGS
    ['DesFiO2', 'GoodLungTemp', 'RR', 'Pexhale', 'Pinhale'].forEach(
        name => socket.on(name, value => {
            console.log(`[REACT] Received ${name}|${value}`);
            mutateNoCollect(name, parseFloat(value), "toArduino", sendToArduino);
        })
    );

    // PERSISTENT/GENERAL SETTINGS
    let configFileName = fs.existsSync('./config.json') ? './config.json' : '/home/pi/SFVentilator/backend/config.json';
    let savedConfig = JSON.parse(fs.readFileSync(configFileName));
    ['HumMargBadTemp', 'HumMargGoodTemp', 'MaxHum', 'MaxTemp', 'MinHum', 'MinTemp',].forEach(name => {
        mutateNoCollect(name, parseFloat(savedConfig[name]), "toReact", socket);
        mutateNoCollect(name, parseFloat(savedConfig[name]), "toArduino", sendToArduino);

        socket.on(name, value => {
            console.log(`[REACT] Received ${name}|${value}`);
            mutateNoCollect(name, parseFloat(value), "toArduino", sendToArduino);

            fs.readFile(configFileName, (_, data) => {
                let currentConfig = JSON.parse(data);
                currentConfig[name] = parseFloat(value);
                fs.writeFile(configFileName, JSON.stringify(currentConfig), () => { });
            });
        });
    });
}

const makeCollectableValue = () => [{
    value: 0,
    timestamp: Date.now(),
}];

const data = {
    arduinoReceiver,
    BattLowWarn: 0,
    DesFiO2: 21,
    FiO2: makeCollectableValue(),
    GoodLungTemp: 37,
    Hum: 0,
    HumAlarm: 0,
    HumWarn: 0,
    HumMargBadTemp: 0,
    HumMargGoodTemp: 0,
    MaxHum: 0,
    MaxTemp: 0,
    MinHum: 0,
    MinTemp: 0,
    LungPress: makeCollectableValue(),
    Pexhale: 0,
    PexWarn: 0,
    Pinhale: 0,
    PinWarn: 0,
    reactReceiver,
    O2inLowAlarm: 0,
    RoomTemp: 0,
    RR: 0,
    setUpPipe,
    ValveBlockedAlarm: 0,
    VT: 0,
};

module.exports = data;