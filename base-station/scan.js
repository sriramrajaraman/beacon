var noble = require('bleacon');

//replace localhost with your server's IP;
var socket = require('socket.io-client')('http://localhost:3000');
var baseStationId = 1;
socket.on('connect', function(){
  console.log('connected to server');
});

noble.on('discover', function(peripheral){
  peripheral.baseStationId = baseStationId;
  console.log(peripheral);
  socket.emit('deviceData', peripheral);
});
noble.startScanning();
//noble.startScanning([], true) //allows dubplicates while scanning