const express=require('express');
const WebSocket=require('ws');
const http=require('http');
const app = express();
const path =require('path');
app.get('/', (req, res) => {//definimos la página de inico.
  res.sendFile(path.join(__dirname, 'indice2.html'));
});
//inicializamos un servidor http
const server = http.createServer(app);
//inicializamos el servidor websocket
const wss = new WebSocket.Server({ server });
let numConexiones=0;//número de websockets clientes conectados


function broadcast(ws, mensaje){
  wss.clients.forEach(function each(client) {
   if (client !== ws && client.readyState === WebSocket.OPEN) {
     client.send(mensaje);
   }
 });
}

function broadcast_2(mensaje){
  wss.clients.forEach(function each(client) {
   if (client.readyState === WebSocket.OPEN) {
     client.send(mensaje);
   }
 });
}

//escuchamos cada conexión
wss.on('connection', (ws, req) => {
  numConexiones++;
  const ip = req.connection.remoteAddress;
  console.log(`Conectado ${ip} número de clientes ${numConexiones}`);
  const bienvenida=`SERVIDOR: se ha conectado ${ip}`;
  const despedida=`SERVIDOR: se ha desconectado ${ip}`;
  //enviamos bienvenida al cliente conectado
  ws.send(JSON.stringify({numero: numConexiones, text:`SERVIDOR: Bienvenido!!!`}));
  broadcast(ws, {numero:numConexiones,text:bienvenida});//retransmisión a todos los clientes menos ws
  //cada vez que un cliente ws envíe un mensaje
  ws.on('message', (message) => {
    let comentario={text:`${ip}: ${message}`};
    ws.send(JSON.stringify({text:`TU: has enviado-> ${message}`}));//mensaje formateado para el cliente ws
    broadcast(ws, comentario);//retransmisión a todos los clientes menos ws
    console.log('recibido: %s de %s', message, ip);
  });

  ws.on('close', () => {//cerrada conexión con cliente ws
   numConexiones--;
   console.log(`Desconectado ${ip} número de clientes ${numConexiones}`);
   broadcast_2({numero:numConexiones,text:despedida});
  //se informa a todos los clientes que aun siguen conectados de la salida de ws
  });
});
//Con primera conexión se incializa envío de mensajes cada 10s a los clientes del servidor
wss.once('connection', ()=>{
setInterval(function() {
  const hoy = new Date();
  broadcast_2({text:'SERVIDOR: Mensaje del servidor '+hoy.toLocaleTimeString("es-es")});
}, 10000);
});

//arrancamos el servidor
server.listen(process.env.PORT || 8999,'0.0.0.0',() => {
    console.log(`Servidor iniciado en ${server.address().port}`);
});


function broadcast(ws, mensaje){
  wss.clients.forEach(function each(client) {
   if (client !== ws && client.readyState === WebSocket.OPEN) {
     client.send(JSON.stringify(mensaje));
   }
 });
}

function broadcast_2(mensaje){
  wss.clients.forEach(function each(client) {
   if (client.readyState === WebSocket.OPEN) {
     client.send(JSON.stringify(mensaje));
   }
 });
}
