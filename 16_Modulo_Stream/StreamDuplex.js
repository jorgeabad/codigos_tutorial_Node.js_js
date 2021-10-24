const { Duplex } = require('stream');
const formato = "                                                 ";
class MyDuplex extends Duplex {
  constructor(datos,destino, options) {
    super(options);
    this.recursoDestino = destino;//destino de escritura.
    this.masDatos=true;//indica si hay mas datos para ser escritos edestino.
    this.on("close", () => console.log(' Writer "close"'));
    this.on("drain", () => console.log(formato, ' Writer "drain"'));
    this.on("error", () => console.log(' Writer "error"'));
    this.on("finish", () => console.log(' Writer "finish"'));
    this.on("pipe", () => console.log(formato, ' Writer "pipe"'));
    this.on("unpipe", () => console.log(' Writer "unpipe"'));
    this._i = 0;
    this._datos = datos;
    this._options = options;
    console.log(`Flujo de lectura modo fluido: ${this._readableState.flowing}`);
    this.on("close", () => console.log('Reader "close"'));
    this.on("end", () => console.log('Reader "end" no hay mas datos'));
    this.on("error", () => console.log('Reader "error"'));

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

  _read() {
    setTimeout(() => {
      console.log(`\nModo fluido: ${this._readableState.flowing}`);
      let chunk; //para almacenar fragmento de datos leído..
      //si posición 'i' existe en vector 'datos' chunk toma el valor del elemento 'i'. Si no 'null' a Buffer (no hay mas datos para leer).
      this._datos[this._i] ? (chunk = this._datos[this._i]) : this.push(null);
      if (chunk) {
        console.log(`(READ) ${this._i}ª Lectura de la fuente de datos`);
        let aviso = this.push(chunk) //fragmento a Buffer -> true<HWM false>HWM
          ? `El fragmento: ${chunk}, añadido al Buffer` //true < HWM
          : `El fragmeto: ${chunk}, añadido al Buffer, limite HWM ${
              this._readableState.highWaterMark
            }!!!`; //false > HWM
        console.log(aviso+"\n");
        console.log('BufferList { head',this._readableState.buffer.head);
        console.log('tail:',this._readableState.buffer.tail);
        console.log('length: %d }',this._readableState.length); //visualiza Buffer
        //if (this._readableState.buffer.head) {console.dir(this._readableState.buffer.head.data)} //visualiza Buffer
        this._i++; //avanzamos en el vector una posición.
      } else {
        console.log("No hay mas datos en la fuente.");
      }
    }, 100);
}

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


}

module.exports = MyDuplex;