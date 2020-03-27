const logs = [];
const log = message => {
    logs.unshift({ message, timestamp: Date.now() });
    console.log(logs[logs.length - 1]);
};

export { log, logs, };
export default logs;