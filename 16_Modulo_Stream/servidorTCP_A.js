const net = require("net");
/**
 *
 * ServidorTCP 
 * @param {net.Socket} socket
 */
servidor = net.createServer((socket) => {  
  /*escribimos en el socket para que el cliente los consuma*/
  socket.write("Hola desde el servidor!!!\n");
  
  /*leemos los datos proporcionados desde el extremo cliente*/
  socket.on("data", (chunk) => {
    console.log(chunk.toString());
  });

  /*canalizamos los datos leidos del cliente al propio socket
  para que el cliente los consuma*/
  socket.pipe(socket);
});

//El evento listening es emitido después de vincularse al puerto.
servidor.on("listening", () => {
  let nombre = servidor.address();
  console.log(`Servidor TCP escuchando en: ${nombre.address}:${nombre.port}`);
});

//vinculamos puerto y host
servidor.listen(8082, "192.168.1.217");
