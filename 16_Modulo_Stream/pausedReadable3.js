const rStream = require("./flujoLectura");
const fuente = ["1", "2", "3", "4", "5", "6", "7", "8"];
const fuenteOb = [{ id: 1, nom: "Juan" }, { id: 2, nom: "Paco" }, { id: 3, nom: "Sara" }, { id: 4, nom: "Ainhoa" }];
const formato = "                                                 ";
/*
const rs = new MyReadable({ highWaterMark: 8 }, fuente);

console.log("Se ha consumido:", rs.read());
setTimeout(() => {
  console.log("\nNueva lectura-------------------------------");
  console.log("Se ha consumido", rs.read());
}, 10000);

*/

const rs = new rStream({ /*highWaterMark: 2,*/ objectMode: false }, fuente);

/*console.log(`${formato} Se ha consumido: ${rs.read(4)}`);

setTimeout(() => {
  console.log("\n Nueva lectura a los 1000 ms:");
  console.log(`${formato} Se ha consumido: ${rs.read()}`);
}, 1000);

setTimeout(() => {
  console.log("\n Nueva lectura a los 2000 ms:");
  console.log(`${formato} Se ha consumido: ${rs.read()}`);
}, 2000);

setTimeout(() => {
  console.log("\n Nueva lectura a los 3000 ms:");
  console.log(`${formato} Se ha consumido: ${rs.read()}`);
}, 3000);*/

function consumidor(){
  setTimeout(()=>{
    rs.read();
  },1000)
}

/*rs.on("readable", () => {
  let chunk;
  console.log(`\n${formato}(READABLE) ya hay datos en el Buffer`);
    while (null !== ((chunk=consumidor()))) {
      console.log(`${formato} Se ha consumido el objeto: ${chunk}`);
    }
    console.log(formato,chunk,'No hay suficientes datos en Buffer o se termino la lectura');
});*/

/* console.log(rs.read());/*
console.log(rs.read(5));
console.log(rs.read(5));
console.log(rs.read(5));*/

/*rs.on("readable", () => {
  let chunk;
  console.log('READABLE!!!!!!!!!!!!!!!!!!!');
  while (null !== (chunk = rs.read(5))) {
    console.log("\nReceived bytes of data.", chunk);
  
  }
});*/

/*console.log(rs.push("1234567"));
console.log(rs.push("890abcd"));
console.log(rs.push("efghijk"));
console.log(rs.push("aaaaaaa"));*/
