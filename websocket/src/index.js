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
    tracesCollection.findOne({ traceId }).then((trace) => {

      let nodes = [];
      let edges = [];

      trace.events.forEach((event) => {
        event.successorBy.map((successor) => {
          edges.push({
            source: successor,
            target: event.checkpointName,
          });
        })

        nodes.push({
          id: event.id,
          serviceName: event.serviceName,
          checkpointName: event.checkpointName,
          timestamp: event.timestamp,
          isError: event.isError,
          genericData: event.genericData,
        });
      });

      socket.emit('trace', {
        nodes,
        edges,
      });
    });
  });
});

// Iniciar o servidor
const port = process.env.PORT || 3002;
server.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});