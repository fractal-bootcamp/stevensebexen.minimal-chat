import {WebSocketServer} from 'ws';

const PORT = 8080;

const wss = new WebSocketServer({port: PORT});

const connectedClients = [];

wss.on('connection', ws => {
  connectedClients.push(ws);
  console.log('Client connected. Open connections:', connectedClients.length);

  ws.on('error', console.error);

  ws.on('message', data => {
    const message = data.toString();
    console.log('Received message: ', message);
    connectedClients.forEach(client => client.send(message));
  });

  ws.on('close', () => {
    connectedClients.splice(connectedClients.indexOf(ws), 1);
    console.log('Client disconnected. Open connections:', connectedClients.length);
  });
});

wss.on('listening', () => console.log('WebSocket listening on port 8080!'));