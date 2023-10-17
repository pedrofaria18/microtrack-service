const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');


const { tracesCollection } = require('./database');


const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  },
});

app.use(cors());

io.on('connection', (socket) => {

  socket.on('disconnect', () => { });

  socket.on('visualizarTrace', (traceId) => {
    setInterval(() => {
      tracesCollection.findOne({ traceId }).then((trace) => {
        socket.emit('trace', trace);
      });
    }, 1000);
  });
});

// Iniciar o servidor
const port = process.env.PORT || 3002;
server.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});