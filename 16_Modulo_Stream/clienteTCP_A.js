const net=require('net');


//Cliente TCP
  const socketTcp = new net.Socket();
  const options={
    port: 8082,
    host: '192.168.1.217',
}

socketTcp.connect(options);//Conectamos con servidor

socketTcp.write('Hola desde el cliente')

socketTcp.on('data',(chunk)=>{
console.log('Dato leido del socket: '+chunk)
})
