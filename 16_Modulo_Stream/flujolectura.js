const { Readable } = require("stream");

class StreamLectura extends Readable {
  constructor(options, datos) {
    super(options);
    this._i = 0;
    this._datos = datos;
    this._options = options;
    console.log(`Flujo de lectura modo fluido: ${this._readableState.flowing}`);
    this.on("close", () => console.log('Reader "close"'));
    this.on("end", () => console.log('Reader "end" no hay mas datos'));
    this.on("error", () => console.log('Reader "error"'));
  }
  _read() {
    setTimeout(() => {
      console.log(`\nModo fluido: ${this._readableState.flowing}`);
      let chunk; //para almacenar fragmento de datos leído.
      //si posición 'i' existe en vector 'datos' chunk toma el valor del elemento 'i'. Si no 'null' a Buffer (no hay mas datos para leer).
      this._datos[this._i] ? (chunk = this._datos[this._i]) : this.push(null);
      if (chunk) {
        console.log(`(READ) ${this._i}ª Lectura de la fuente de datos`);
        let aviso = this.push(chunk) //fragmento a Buffer -> true<HWM false>HWM
          ? `El fragmento: ${chunk}, añadido al Buffer` //true < HWM
          : `El fragmeto: ${chunk}, añadido al Buffer, limite HWM ${
              this._readableState.highWaterMark
            }!!!`; //false > HWM
        console.log(aviso);
        console.log("\n", this._readableState.buffer); //visualiza Buffer
        this._i++; //avanzamos en el vector una posición.
      } else {
        console.log("No hay mas datos en la fuente.");
      }
    }, 100);
  }
}
module.exports = StreamLectura;
