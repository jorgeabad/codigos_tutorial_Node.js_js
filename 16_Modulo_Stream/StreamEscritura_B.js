const Writable = require("stream").Writable;
const formato = "                                                 ";

class Writer extends Writable {
  constructor(options, destino) {
    super(options);
    this.recursoDestino = destino;//destino de escritura.
    this.on("close", () => console.log(' Writer "close"'));
    this.on("drain", () => console.log(formato, ' Writer "drain"'));
    this.on("error", () => console.log(' Writer "error"'));
    this.on('finish', () => console.log(' Writer "finish"'));
    this.on("pipe", () => console.log(formato, ' Writer "pipe"'));
    this.on("unpipe", () => console.log(' Writer "unpipe"'));
  }
  //devulve una cadena con el contenido del búfer interno del flujo de escritura.
  getBufferWriteable() {
    let buf = this._writableState.getBuffer(); //búfer
    let datos = []; //array para almacenar los datos del búfer
    if (buf.length === 0) {
      //Si no hay datos en el búfer.
      datos = "Buffer vacío";
    }
    buf.forEach(function(c) {
      //si hay datos
      datos.push(c.chunk); //almacenamos en el array
    });
    return "Contenido Buffer interno: " + datos; //devulve 'datos' como cadena.
  }

  _write(chunk, encoding, callback) {
    setTimeout(() => {
      let datosBuffer = this.getBufferWriteable();
    console.log("\n" + formato + "WRITE: Se va a escribir el fragmento",chunk,"; caracter: ",chunk.toString());
    console.log(formato+datosBuffer+". Tamaño total stream: "+this._writableState.length);
      this.recursoDestino.push(chunk.toString()); //escribimos en el recurso destino
      callback(); //una vez escrito invocamos a la función callback
      console.log("\n"+formato+"Callback: Se ha escrito el caracter "+chunk.toString()+" en destino->",this.recursoDestino);
      console.log(formato+this.getBufferWriteable()+". Tamaño total stream: "+this._writableState.length);
    }, 600); //simula el tiempo que tarda en escribir en el recurso destino.
   
  }

  end(chunk, encoding, callback) {
      callback();
  }
}

module.exports = Writer;
