var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {

  io.emit('user_connected');

  socket.on('disconnect', () => {
    io.emit('disconnect');
  });

  socket.on('chat message', (message) => {
    io.emit('chat message', message);
  });

  socket.on('typing', () => {
    socket.broadcast.emit('typing');
  });
});

http.listen(3000, () => {
  console.log('Listening on *:3000');
});