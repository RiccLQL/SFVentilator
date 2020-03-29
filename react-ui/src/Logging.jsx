const logs = [];
const log = message => logs.unshift({ message, timestamp: Date.now() });

export { log, logs, };
export default logs;