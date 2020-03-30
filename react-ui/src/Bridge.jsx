import { useEffect } from "react";

import socketIOClient from "socket.io-client";

import { log } from './Logging';
import { sortInPlace } from './Utilities';

export function makePointAdder(maxPointCount, name) {
    return point => Bridge[name] = sortInPlace([...Bridge[name].slice(Math.max(0, Bridge[name].length - maxPointCount)), point]);
};

export function makeSetter(name, socket) {
    return value => {
        Bridge[name] = value;
        socket.emit(name, value);
    };
};

export const FiO2 = [{
    value: 0, timestamp: Date.now(),
}];

export const LungPress = [{
    value: 0, timestamp: Date.now(),
}];

export function useBridge() {
    useEffect(() => {
        const socket = socketIOClient("http://127.0.0.1:4001");
        socket.on('connect_error', () => log("Failed to connect to socket.io"));
        socket.on('connect', () => log("Connected to socket.io"));
        socket.on('disconnect', () => { log("Socket.io disconnected"); });

        socket.on('RoomTemp', value => Bridge.RoomTemp = value);

        socket.on('FiO2', makePointAdder(200, "FiO2"));
        socket.on('LungPress', makePointAdder(200, "LungPress"));

        Bridge.setDesFiO2 = makeSetter("DesFiO2", socket);
    }, []);
};

export const Bridge = {
    DesFiO2: 21,
    FiO2,
    LungPress,
    makePointAdder,
    RoomTemp: 20,
    useBridge,
};

export default Bridge;