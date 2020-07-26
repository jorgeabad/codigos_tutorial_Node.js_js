
const rStream = require("./flujoLectura");
const fuente = ["1", "2", "3", "4", "5", "6", "7", "8"];
const fuenteOb = [{ id: 1, nom: "Juan" }, { id: 2, nom: "Paco" }, { id: 3, nom: "Sara" }, { id: 4, nom: "Ainhoa" }];
const formato = "                                                 ";

const rs = new rStream({ /*highWaterMark: 3,*/ objectMode: false }, fuente);

console.log(`${formato} Se ha consumido: ${rs.read()}`);

setTimeout(() => {
  console.log("\n Nueva lectura a los 1000 ms:");
  console.log(`${formato} Se ha consumido: ${rs.read()}`);
}, 1000);