module.exports = socket => {
    let interval = 500;

    setInterval(async () => {
        socket.emit("flow", {
            datum: {value: Math.sin(Date.now()) * 100, timestamp: Date.now()},
            interval,
        });
    }, interval);    
};