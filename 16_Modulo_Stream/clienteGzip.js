const net=require('net');
const zlib = require('zlib');
const fs = require('fs');
const fileCliente='.//happy.png'

//Cliente TCP
  const socketTcp = new net.Socket();
  const options={
    port: 8082,
    host: '192.168.1.217',
}

socketTcp.connect(options);//Conectamos con servidor

fs.createReadStream(fileCliente)
  .pipe(zlib.createGzip())
  .pipe(socketTcp)
  .on('finish', () => {
    console.log('\nFichero enviado')
  })

