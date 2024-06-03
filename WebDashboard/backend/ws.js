require('dotenv').config();
const express = require('express');
const app = express();
const server = require('http').Server(app);
const url = require('url');
const WebSocket = require('ws');

const wss1 = new WebSocket.Server({ noServer: true });
const wss2 = new WebSocket.Server({ noServer: true });

//esp32-cam websocket
wss1.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    //Process the video stream received from the ESP32 CAM
    // Use OpenCV for facial detection and recognition
    // Send back the processed data (e.g., detected faces) to the client
    wss2.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

//webbrowser websocket
wss2.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
  	// nothing here should be received
    console.log('received wss2: %s', message);
  });
});

server.on('upgrade', function upgrade(request, socket, head) {
  const pathname = url.parse(request.url).pathname;
  if (pathname === '/jpgstream_server') {
    console.log(request);
    wss1.handleUpgrade(request, socket, head, function done(ws) {
      wss1.emit('connection', ws, request);
    });
  } else if (pathname === '/jpgstream_client') {
    wss2.handleUpgrade(request, socket, head, function done(ws) {
      wss2.emit('connection', ws, request);
    });
  } else {
    socket.destroy();
  }
});

const listener = server.listen(process.env.WS_PORT || 3002, () => {
	  console.log(`App listening at http://localhost:${listener.address().port}`);
})

