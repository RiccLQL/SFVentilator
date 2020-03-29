module.exports = socket => {
    let interval = 1000;

    setInterval(async () => {
        socket.emit("flow", {
            datum: { value: Math.sin(Date.now() / 1000) * 100, timestamp: Date.now() },
            interval,
        });
    }, interval);
};