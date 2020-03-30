import { useEffect } from "react";

import socketIOClient from "socket.io-client";

import { log } from './Logging';
import { sortInPlace } from './Utilities';

export function makePointAdder(maxPointCount, name) {
    return point => Bridge[name] = sortInPlace([...Bridge[name].slice(Math.max(0, Bridge[name].length - maxPointCount)), point]);
};

export function makeSetter(name, socket) {
    return value => {
        Bridge.status = `Status: Updating setting ${name}...`;
        Bridge[name] = value;
        log(`Setting ${name} to ${value}`);
        socket.emit(name, value);
        Bridge.status = `Status: Connected.`;
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
            'MinTemp', 'Pmax', 'Pmin', 'RoomTemp', 'RR', 'VT',].forEach(name => socket.on(name, value => Bridge[name] = value));

        // collect backend -> React
        ['FiO2', 'LungPress',].forEach(name => socket.on(name, makePointAdder(200, name)));

        // nonCollect React -> backend
        ['DesFiO2', 'GoodLungTemp', 'HumMargBadTemp', 'HumMargGoodTemp', 'MaxHum', 'MaxTemp', 'MinHum',
            'MinTemp', 'RR', 'Pmax', 'Pmin'].forEach(name => Bridge['set' + name] = makeSetter(name, socket));
    }, []);
};

export const Bridge = {
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
    Pmax: 0,
    Pmin: 0,
    RoomTemp: 0,
    RR: 0,
    status: "Status: Connecting...",
    VT: 0,
    useBridge,
};

export default Bridge;