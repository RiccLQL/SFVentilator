import { useEffect } from "react";

import socketIOClient from "socket.io-client";

import { log } from './Logging';
import { sortInPlace } from './Utilities';
import alarms from './alarms';

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
        ['Hum', 'HumMargBadTemp', 'HumMargGoodTemp', 'MaxHum', 'MaxTemp', 'MinHum',
            'MinTemp', 'Pexhale', 'Pinhale', 'RoomTemp', 'RR', 'VT',].forEach(name => socket.on(name, value => Bridge[name] = value));

        // collect backend -> React
        ['FiO2', 'LungPress',].forEach(name => socket.on(name, makePointAdder(200, name)));

        // alarm backend -> React
        ['BattLowWarn', 'HumAlarm', 'HumWarn', 'PexWarn', 'PinWarn', 'O2inLowAlarm', 'ValveBlockedAlarm'].forEach(name =>
            socket.on(name, data => {
                let alarmDialogData = alarms[name].dialogData;
                let next = !!data;

                if (next && !Bridge[name])
                    Bridge.alarmDialog = {
                        ...alarmDialogData,
                        open: true,
                        setOpen: open => Bridge.alarmDialog.open = open,
                    };
                else if (!next && Bridge[name]
                    && alarmDialogData.description === Bridge.alarmDialog.description
                    && alarmDialogData.severity === Bridge.alarmDialog.severity)
                    Bridge.alarmDialog.open = false;

                Bridge[name] = next;
            })
        );

        // nonCollect React -> backend
        ['DesFiO2', 'GoodLungTemp', 'HumMargBadTemp', 'HumMargGoodTemp', 'MaxHum', 'MaxTemp', 'MinHum',
            'MinTemp', 'RR', 'Pexhale', 'Pinhale',].forEach(name => Bridge['set' + name] = makeSetter(name, socket));
    }, []);
};

export const Bridge = {
    alarmDialog: { open: false },
    alarms,
    BattLowWarn: false,
    DesFiO2: 21,
    FiO2: makeCollectableValue(),
    GoodLungTemp: 37,
    Hum: 0,
    HumAlarm: false,
    HumWarn: false,
    HumMargBadTemp: 0,
    HumMargGoodTemp: 0,
    MaxHum: 30,
    MaxTemp: 30,
    MinHum: 30,
    MinTemp: 30,
    LungPress: makeCollectableValue(),
    makePointAdder,
    Pexhale: 0,
    PexWarn: false,
    Pinhale: 0,
    PinWarn: false,
    O2inLowAlarm: false,
    RoomTemp: 0,
    RR: 0,
    status: "Status: Connecting...",
    ValveBlockedAlarm: false,
    VT: 0,
    useBridge,
};

export default Bridge;