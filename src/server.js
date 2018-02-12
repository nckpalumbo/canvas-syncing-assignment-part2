const http = require('http');
const socketio = require('socket.io');

const fs = require('fs');

const PORT = process.env.PORT || process.env.NODE_PORT || 3000;

const handler = (req, res) => {
  fs.readFile(`${__dirname}/../client/index.html`, (err, data) => {
    if (err) {
      throw err;
    }

    res.writeHead(200);
    res.end(data);
  });
};

const app = http.createServer(handler);

const io = socketio(app);

app.listen(PORT);

io.on('connection', (socket) => {
  socket.join('room1');
    
  socket.on('draw', (data) => {
      //console.log('emit from server');
      io.sockets.in('room1').emit('draw', {time: data.time, coordinates: data.coordinates}); 
  });

  socket.on('disconnect', () => {
    socket.leave('room1');
  });
});

console.log(`Listening on port ${PORT}`);