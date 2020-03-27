import { useEffect } from "react";

import socketIOClient from "socket.io-client";

import { log } from './Logs';

export function useBridge() {
    useEffect(() => {
        const socket = socketIOClient("http://127.0.0.1:4001");
        socket.on('connect_error', () => log("Failed to connect to socket.io"));
        socket.on('connect', () => log("Connected to socket.io"));
        socket.on('disconnect', () => { log("Socket.io disconnected"); });

        socket.on('flow', Bridge.makePointAdder(10, "flow"));
    }, []);
};

export function makePointAdder(maxPointCount, name) {
    return point => Bridge[name] = [...Bridge[name].slice(Math.max(0, Bridge[name].length - maxPointCount)), point]
};

export const flow = [{
    datum: { value: 0, timestamp: Date.now() },
    interval: 50,
}];

export const Bridge = {
    flow,
    makePointAdder,
    useBridge,
};

export default Bridge;