
var Buscador=require('./Buscador_');

let muestra=['Blanco', 'Negro', 'Rojo', 'Blanco', 'Blanco', 'Negro', 'Verde'];
let elementos_a_buscar=['Gris','Verde','Blanco','Amarillo'];

let buscador=new Buscador(muestra);
console.log('\nSe muestra el objeto buscador sin listeners:');
console.dir(buscador, {colors: true})




console.log('\nEscuchando eventos "newListener", "removeListener", "encontrado", "NoEncontrado" y "fin"')
buscador.detectores();
console.dir(buscador, {colors: true})


function hayUno(){
  console.log('Primer elemento encontrado');
}
function seguimos(){
  console.log('seguimos buscando mas elementos...');
}
function alerta(){
  console.log('Alerta!!');
}

console.log('\nAñadimos mas detectores a eventos "encontrado", "NoEncontrado"')
buscador.once('encontrado', seguimos);
buscador.prependOnceListener('encontrado', hayUno )
buscador.prependListener('NoEncontrado', alerta);

console.log('\nlisteners evento "encontrado":');
console.dir(buscador._events['encontrado'],{colors: true});
console.log('\nlisteners evento "NoEncontrado":')
console.dir(buscador._events['NoEncontrado'],{colors: true});
console.dir(buscador, {colors: true, depth: 3});



var huboEvento=buscador.emit('prueba');
console.log(huboEvento);//imprime false
huboEvento=buscador.emit('fin');//ejecuta función finBusqueda
console.log(huboEvento);//imprime true


buscador.buscar(elementos_a_buscar);

console.log(buscador);

console.log('\nQuitamos el detector Alerta para el evento "NoEncontrado"');
buscador.removeListener('NoEncontrado', alerta);
console.log(buscador);

/*console.log('\nQuitamos el detector infoRemove para el evento "removeListener"');
buscador.removeListener('removeListener', infoRemove);
console.log(buscador);*/

buscador.buscar(elementos_a_buscar);


console.log('\nEliminamos todos los listeners del objeto buscador');
buscador.removeAllListeners();
console.log(buscador);
console.log('\nBuscamos los siguientes colores '+ elementos_a_buscar);
buscador.buscar(elementos_a_buscar);


console.log('\nEscuchando eventos "newListener", "removeListener", "encontrado", "NoEncontrado" y "fin"')
buscador.detectores();
buscador.info();

let buscador2=new Buscador(muestra);
console.log(`\n Número máximo de listeners para buscador2 =`, buscador2.getMaxListeners())
console.log('Añadimos más de 10 detectores al evento "encontrado"')
for (let i=1; i<12; i++){
  buscador2.on('encontrado', function (e,p){
    console.log(`Mensaje de la función ${i} asociada al evento 'encontrado':`+
    ` encontrado ${e} en posición ${p}`);
  })
}

console.log("listeners para evento 'encontrado'", buscador2.listeners(`encontrado`));


buscador2.buscar(['Gris','Verde']);

buscador2.on('error', function (err) {
  console.log('Ha ocurrido un error.'+err);
});

buscador2.emit('error', new Error('indeterminado'));
console.log('Después del error...');

/*
buscador.setMaxListeners(11);

buscador.on('error', function (err) {
  console.log('whoops! there was an error');
});
buscador.emit('error', new Error('whoops!'));*/
