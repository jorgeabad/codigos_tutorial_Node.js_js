const net=require('net');
const crypto = require('crypto');//(1)
const zlib = require('zlib');
const fs = require('fs');
const fileServer = './/registro.txt'
const fileCliente='.//hola.txt'

const writeStream = fs.createWriteStream(fileServer);
const iv = crypto.randomBytes(16)//(2)
const key = crypto.randomBytes(24);//(3)


//Servidor TCP (A)
net.createServer((socket)=> {
      socket
      .pipe(crypto.createDecipheriv('aes192', key, iv))//(4)
      .pipe(zlib.createGunzip())
      .pipe(writeStream)
      .on('finish', () => {
        console.log('Fichero salvado en servidor')
      }) 
}).listen(8082);

//Cliente TCP (B)
setTimeout(()=>{
  const socketTcp = new net.Socket();
  const options={
    port: 8082,
    host: '192.168.1.217',
}

socketTcp.connect(options);//Conectamos con servidor

fs.createReadStream(fileCliente)
  .pipe(zlib.createGzip())
  .pipe(crypto.createCipheriv('aes192', key, iv))//(5)
  .pipe(socketTcp)
  .on('finish', () => {
    console.log('\nFichero enviado')
  })

},1000);


