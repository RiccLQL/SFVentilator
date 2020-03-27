const express = require('express');
const http = require('http');
const path = require('path');
const socketIo = require('socket.io');

const port = process.env.PORT || 4001;
const app = express();

app.use((req, res, next) => {
    console.log([req.method, req.url, "query=" + JSON.stringify(req.query)].join(' | '));
    next();
});
app.use(express.static(path.join(__dirname, '../react-ui/build')));

app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../react-ui/build/index.html')));

const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', socket => {
    console.log(Date.now() + ' New client connected!');
    socket.on('disconnect', () => console.log('Client disconnected!'));
    require('./synthetic')(socket);
});

server.listen(port, () => console.log(`Listening on port ${port}`));