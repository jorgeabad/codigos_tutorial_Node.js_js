const net=require('net');
const zlib = require('zlib');
const fs = require('fs');
const fileServer = './/copia.png'//nombre del archivo en servidor

//Creamos un flujo de escritura
const writeStream = fs.createWriteStream(fileServer);


//Servidor TCP
const servidor=net.createServer((socket)=> {
      socket//lectura
      .pipe(zlib.createGunzip())//transform
      .pipe(writeStream)//escritura
      .on('finish', () => {
        console.log('Fichero salvado en servidor')
      }) 
})

servidor.on('listening', () => {//después de vincularse al puerto.
    let nombre = servidor.address();
    console.log(`Servidor TCP escuchando en: ${nombre.address}:${nombre.port}`);
  });
  
servidor.listen(8082, '192.168.1.217');