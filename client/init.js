var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var scanner = io.of('/'); 

scanner.on('connection', function(socket) {

    console.log('Scanner Connected');
    
    socket.on('deviceData', function(msg) {
        //recived message from scanner
        //do some processing here
				socket.compress(false).broadcast.emit('deviceData',msg);
				console.log(msg);
    });

    socket.on('disconnect', function() {
        console.log('Scanner Disconnected');
    });
});

http.listen(3000, function() {
    console.log('listening on *:3000');
});

var path = require('path');
app.use('/', express.static(__dirname));