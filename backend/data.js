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

const noCollect = ["RoomTemp"];
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
    }, 100);
}

async function reactReceiver(socket, sendToArduino) {
    ['DesFiO2'].forEach(
        name => socket.on(name, value =>
            mutateNoCollect(name, parseFloat(value), "toArduino", sendToArduino)
        )
    );
}

const data = {
    arduinoReceiver,
    DesFiO2: 21,
    FiO2: [{
        value: 0,
        timestamp: Date.now()
    }],
    LungPress: [{
        value: 0,
        timestamp: Date.now()
    }],
    reactReceiver,
    RoomTemp: 20,
    setUpPipe,
};

module.exports = data;