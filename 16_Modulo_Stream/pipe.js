const Writer = require("./StreamEscritura_B");
const rStream = require('./flujoLectura_B');
const fuente = ["1", "2", "3", "4", "5", "6", "7", "8"];
const destino = [];//estructura donde se quiere escribir.

const rs = new rStream({ highWaterMark: 3, objectMode: false }, fuente);
const writer = new Writer({ highWaterMark: 3,objectMode: false }, destino);

rs.pipe(writer, {end:false});
