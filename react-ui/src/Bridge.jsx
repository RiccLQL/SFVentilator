import { useEffect } from "react";

import socketIOClient from "socket.io-client";

import { log } from './Logging';
import { range, sortInPlace } from './Utilities';

export function makePointAdder(maxPointCount, name) {
    return point => Bridge[name] = sortInPlace([...Bridge[name].slice(Math.max(0, Bridge[name].length - maxPointCount)), point]);
};

export function makeSetter(name, socket) {
    return value => {
        let oldStatus = Bridge.status;
        Bridge.status = `Status: Updating setting ${name}...`;
        Bridge[name] = value;
        log(`Setting ${name} to ${value}`);
        socket.emit(name, value);
        Bridge.status = oldStatus;
    };
};

const makeCollectableValue = () => [{
    value: 0,
    timestamp: Date.now(),
}];

export function useBridge() {
    useEffect(() => {
        const socket = socketIOClient("http://127.0.0.1:4001");
        socket.on('connect_error', () => log("Failed to connect to socket.io"));
        socket.on('connect', () => {
            log("Connected to socket.io");
            Bridge.status = `Status: Connected.`;
        });
        socket.on('disconnect', () => {
            log("Socket.io disconnected");
            Bridge.status = `Status: Connecting...`;
        });

        // nonCollect backend -> React
        ['HumMargBadTemp', 'HumMargGoodTemp', 'MaxHum', 'MaxTemp', 'MinHum',
            'MinTemp', 'Pexhale', 'Pinhale', 'RoomTemp', 'RR', 'VT',].forEach(name => socket.on(name, value => Bridge[name] = value));

        // collect backend -> React
        ['FiO2', 'LungPress',].forEach(name => socket.on(name, makePointAdder(200, name)));

        // nonCollect React -> backend
        ['DesFiO2', 'GoodLungTemp', 'HumMargBadTemp', 'HumMargGoodTemp', 'MaxHum', 'MaxTemp', 'MinHum',
            'MinTemp', 'RR', 'Pexhale', 'Pinhale',].forEach(name => Bridge['set' + name] = makeSetter(name, socket));
    }, []);
};

export const Bridge = {
    alarms: range(8).map(n => `Alarm ${n}`),
    DesFiO2: 21,
    FiO2: makeCollectableValue(),
    GoodLungTemp: 37,
    HumMargBadTemp: 0,
    HumMargGoodTemp: 0,
    MaxHum: 30,
    MaxTemp: 30,
    MinHum: 30,
    MinTemp: 30,
    LungPress: makeCollectableValue(),
    makePointAdder,
    Pexhale: 0,
    Pinhale: 0,
    RoomTemp: 0,
    RR: 0,
    status: "Status: Connecting...",
    VT: 0,
    useBridge,
};

export default Bridge;