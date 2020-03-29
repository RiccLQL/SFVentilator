const csv = require('./csv');

const unsureMessage = () => console.log(`[ARD] Unsure how to process data with name "${name}" and value ${value}`);

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
        unsureMessage();
}

async function mutateCollect(name, value, direction, extra) {
    if (data.hasOwnProperty(name)) {
        let timestamp = Date.now();
        let nextDatum = { value, timestamp, };

        data[name] = [...data[name], nextDatum];
        csv.addToCsv(name, value, timestamp, direction);
        nexts[direction](name, nextDatum, extra);
    } else
        unsureMessage();
}

async function arduinoReceiver(data, socket) {
    //console.log('[ARD] Received data from Arduino: ' + data);
    let [name, value] = data.split('|');

    switch (name) {
        case "RoomTemp":
            mutateNoCollect(name, parseFloat(value), "toReact", socket);
            break;
        case "Flow":
            mutateCollect(name, parseFloat(value), "toReact", socket);
            break;
        default:
            unsureMessage();
    }
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
    Flow: [{
        value: 0,
        timestamp: Date.now()
    }],
    DesFiO2: 21,
    reactReceiver,
    RoomTemp: 20,
    tStart: '',
};

module.exports = data;