const rStream = require('./flujoLectura');
const fuente = ["1", "2", "3", "4", "5", "6", "7", "8"];
const fuenteOb = [{ id: 1, nom: 'Juan' }, { id: 2, nom: 'Paco' }, { id: 3, nom: 'Sara' }, { id: 4, nom: 'Ainhoa' }];
const formato = '                                                 ';


const rs = new rStream({ highWaterMark: 3, objectMode: false }, fuente);

console.log('\nEscuchamos evento readable');
/*rs.on("readable", () => {
  
});*/

rs.on("readable", () => {
  let chunk;
  console.log(`\n${formato}(READABLE) ya hay datos en el Buffer`);
  setTimeout(()=>{
    while (null !== (chunk = rs.read())) {
      console.log(`${formato} Se ha consumido el objeto: ${chunk}`);
    }
    console.log(formato,chunk,'No hay suficientes datos en Buffer o se termino la lectura');
  },300);
  
});
