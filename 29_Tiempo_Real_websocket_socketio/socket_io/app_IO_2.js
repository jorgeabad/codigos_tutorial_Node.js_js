const express=require('express');
const http=require('http');
const app = express();
const path =require('path');

app.get('/', (req, res) => {
  console.error('express connection');
  res.sendFile(path.join(__dirname, 'indice4.html'));
});
//inicializamos un servidor http
const server = http.createServer(app);
//inicializamos el servidor websocket
const io = require('socket.io')(server);//namespace global
let numConexiones=0;//número de websockets clientes conectados
let numSalaA=0;//número de clientes conectados en sala A
let numSalaB=0;//número de clientes conectados en sala B
let nspSistema = io.of('/mensajesSistema');//namespace del sistema

//evento connection para el namespace del sistema
nspSistema.on('connection', function(socket){
	console.log('Se a conectado a namespace mensajesSistema');
  nspSistema.emit('message',{text:`Se ha conectado a namespace mensajesSistema`});
});
nspSistema.once('connection', ()=>{
  setInterval(function() {
    const hoy = new Date();
    nspSistema.emit('message',{text:'SERVIDOR: Mensaje del servidor '+hoy.toLocaleTimeString("es-es")});
  }, 10000);
  });

//eventos para namespace por defecto
io.on('connection', function (socket) {
  numConexiones++;
  const ip = socket.request.connection.remoteAddress;
  console.log(`Conectado ${ip} número de clientes ${numConexiones}`);
  const bienvenida=`SERVIDOR: se ha conectado ${ip}`;
  const despedida=`SERVIDOR: se ha desconectado ${ip}`;
  socket.emit('message',{numero: numConexiones, text:`SERVIDOR: Bienvenido!!!`});
  socket.broadcast.emit('message',{numero:numConexiones,text:bienvenida});
  
  //Se emite a todo "io" el nº de usuarios en cada sala.
  io.emit('message',{usersSala:[numSalaA, numSalaB]});

  socket.on('sala', function(sala) {
       if (socket.sala){//si la sesión tiene una sala.
        if (socket.sala===sala){//si es la misma que la requerida informamos
          socket.emit('message',{tipo:socket.sala, text:`Ya estas unido a esta sala ${socket.sala}`});
        }else{//si es una sala nueva 
         socket.leave(socket.sala);//dejamos sala actual
         //contabilizamos la salida en función de la sala
          if(socket.sala==='salaA'){numSalaA--};
          if(socket.sala==='salaB'){numSalaB--};
         io.emit('message',{usersSala:[numSalaA, numSalaB]});
         socket.emit('message',{tipo:socket.sala, text:`Has salido de ${socket.sala}`});
         socket.emit(sala,{text:`Has salido de ${socket.sala}`});
         socket.broadcast.to(socket.sala).emit('message',{tipo:socket.sala, text:`${ip} ha dejado la ${socket.sala}`});
         socket.sala=undefined;
        }
       }
       if(!socket.sala){
        socket.join(sala);//entramos en la nueva sala
        socket.sala=sala;//actualizamos valor de la sala
        console.log(sala);
        if(socket.sala==='salaA'){numSalaA++};
        if(socket.sala==='salaB'){numSalaB++};
        io.emit('message',{usersSala:[numSalaA, numSalaB]});
        socket.emit('message',{tipo:sala, text:`Bienvenido a `+sala});
        socket.broadcast.to(sala).emit ('message',{tipo:sala,text:`${ip} entro en ${sala}`});
       }

});

socket.on('message', function(message){
  let comentario={tipo:socket.sala, text:`${ip}: ${message}`};
  socket.emit('message',{tipo:socket.sala, text:`TU: has enviado-> ${message}`});//mensaje formateado para el cliente ws
  console.log('recibido: %s de %s', message, ip);
  console.log(comentario);
  socket.to(socket.sala).emit('message',comentario);
});

socket.on('disconnect', function (data) {
  numConexiones--;
  socket.leave(socket.sala);//dejamos sala actual
  if(socket.sala==='salaA'){numSalaA--};
  if(socket.sala==='salaB'){numSalaB--};
  io.emit('message',{usersSala:[numSalaA, numSalaB]});
  socket.emit('message',{tipo:socket.sala, text:`Has salido de ${socket.sala}`});
  socket.broadcast.to(socket.sala).emit('message',{tipo:socket.sala, text:`${ip} ha dejado la ${socket.sala}`});
  console.log(`Desconectado ${ip} número de clientes ${numConexiones}`);
  io.emit('message',{numero:numConexiones,text:despedida});
 });
});





//arrancamos el servidor
server.listen(process.env.PORT || 3000,'0.0.0.0',() => {
    console.log(`Servidor iniciado en ${server.address().port}`);
});
