const express = require('express')
const app =  express();

app.use(express.static(__dirname + '/../static') );

const http = require('http').Server(app);

const io = require('socket.io')(http);

io.on('connection', function(socket){
    socket.on('login', (data) => {
        socket.login = data
        io.emit('login', data)
        
    })

    socket.on('sendMessage', (data) => {
        io.emit('takeMessage', {login: socket.login, text: data })
    })
  });



let port = process.env.PORT || 5000;

http.listen(port)
