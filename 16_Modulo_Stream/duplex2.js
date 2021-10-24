const { Duplex } = require('stream');

class MyDuplex extends Duplex {

    constructor(datos,destino, options) {
        super(options);
        this.on("close", () => console.log(' Writer "close"'));
        this.on("drain", () => console.log(' Writer "drain"'));
        this.on("error", () => console.log(' Writer "error"'));
        this.on("finish", () => console.log(' Writer "finish"'));
        this.on("pipe", () => console.log(' Writer "pipe"'));
        this.on("unpipe", () => console.log(' Writer "unpipe"'));
        this.on("close", () => console.log('Reader "close"'));
        this.on("end", () => console.log('Reader "end" no hay mas datos'));
        this.on("error", () => console.log('Reader "error"'));
    
      }

  _write(chunk, encoding, callback) {
      console.log('        ECO:'+chunk.toString().toUpperCase());
   callback()
  }

  _read() {
    setTimeout(() => {
     const mensajes=['OK!', 'Muy Bien!', 'Olee!', 'Ánimo!', 'Vamos!', 'Fenomenal!', 'Hasta luego\n']
     const RandomMensaje= mensajes[Math.floor(Math.random()*mensajes.length)]
     const esDespedida = RandomMensaje ==='Hasta luego\n'
     if (esDespedida){
        this.push(RandomMensaje.toString().toUpperCase())
        this.push(null)
        return
     } 
     this.push(RandomMensaje.toString().toUpperCase()+'\n')
    }, 1500);
}




}

const miDuplex=new MyDuplex();
process.stdin.pipe(miDuplex).pipe(process.stdout);