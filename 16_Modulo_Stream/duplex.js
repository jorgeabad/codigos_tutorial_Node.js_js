const duplexStream = require('./StreamDuplex');
const fuente = ["1", "2", "3", "4", "5", "6", "7", "8"];
const destino = [];//estructura donde se quiere escribir.

const miDuplex = new duplexStream(fuente, destino, { highWaterMark: 3, objectMode: false });

miDuplex.write('0');

miDuplex.pipe(miDuplex)
