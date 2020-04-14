const express=require('express');
const http=require('http');
const app = express();
const path =require('path');
//servimos el archivo indice3.html como página de inicio.
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'indice3.html'));
});
//inicializamos un servidor http
const server = http.createServer(app);
//inicializamos el servidor socket.io, namespace "/"
const io = require('socket.io')(server);
let numConexiones=0;//número de websockets clientes conectados

//cuando un cliente se conecta a nuestro espacio de nombres
io.on('connection', function (socket) {
  numConexiones++;
  const ip = socket.request.connection.remoteAddress;
  console.log(`Conectado ${ip} número de clientes ${numConexiones}`);
  const bienvenida=`SERVIDOR: se ha conectado ${ip}`;
  const despedida=`SERVIDOR: se ha desconectado ${ip}`;
//enviamos un mensaje formateado para el cliente conectado
  socket.emit('message',{numero: numConexiones, text:`SERVIDOR: Bienvenido!!!`});
 //enviamos el mensaje a todos los clientes conectados menos al cliente del socket.
  socket.broadcast.emit('message',{numero:numConexiones,text:bienvenida});

//configuramos el socket conectado para escuchar el evento "message" que emiten los clientes.
  socket.on('message', function(message){
    let comentario={text:`${ip}: ${message}`};
    //enviamos un mensaje formateado para el cliente envío el mensaje al servidor.
    socket.emit('message',{text:`TU: has enviado-> ${message}`});
    console.log('recibido: %s de %s', message, ip);//mostramos mensaje recepcionado
    //enviamos el mensaje a todos los clientes conectados menos al remitente
    socket.broadcast.emit('message',comentario);
  });

//Al desconectarse un cliente, modificamos el contador  
  socket.on('disconnect', function (data) {
    numConexiones--;
    console.log(`Desconectado ${ip} número de clientes ${numConexiones}`);
    //emitimos un mensaje a todo el namespace
    io.emit('message',{numero:numConexiones,text:despedida});
  });
});
//se iniciará con la primera conexión, solo sucede una vez.
io.once('connection', ()=>{
setInterval(function() {
  const hoy = new Date();
  //emitimos un mensaje a todo el namespace
  io.emit('message',{text:'SERVIDOR: Mensaje del servidor '+hoy.toLocaleTimeString("es-es")});
}, 10000);
});


//arrancamos el servidor
server.listen(process.env.PORT || 3000,'0.0.0.0',() => {
    console.log(`Servidor iniciado en ${server.address().port}`);
});
