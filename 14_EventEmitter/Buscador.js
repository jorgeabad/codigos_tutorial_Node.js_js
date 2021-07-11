'use strict';
const EventEmitter = require('events');

class Buscador extends EventEmitter {
constructor(muestra) {
  super();
  this.muestra=muestra;
}


detectores(){
  //Funciones listeners
  function infoNew (evento, fn) {
      console.log("*INFO evento 'newListener' añadida función: "+fn.name+" para evento "+evento);
      }
  function infoRemove (evento, fn) {
      console.log("*INFO evento 'removeListener' eliminada función: "+fn.name+" para evento "+evento);
      }
  function infoEnc(e,p){
        console.log(' Encontrado elemento '+e+' en posición '+p);
      }
  function infoNoEnc(e){
        console.log(' No se ha encontrado el elemento '+e);
      }
  function finBusqueda(){
        console.log(' Se ha terminado la búsqueda de todos los elementos\n');
      }
  //Se añade el listener a la matriz del evento correspondiente.
  this.on('newListener', infoNew)
      .on('removeListener', infoRemove)
      .on('encontrado', infoEnc)
      .addListener('NoEncontrado', infoNoEnc)
      .on('fin', finBusqueda);
}


//Función que busca elementos y emite eventos.
buscar(vecA){
  console.log(`\n Comenzamos búsqueda de elementos [${vecA}] en [${this.muestra}]`);
  let self=this;
  //para cada elemento del vectorA realizamos la búsqueda en el vector del objeto
  vecA.forEach(function(elemento){
  var posicion = self.muestra.indexOf(elemento); //'-1' o 'N' (con N>=0)
    switch (posicion){
      case -1: //si no se encuentra el elemento
      self.emit('NoEncontrado',elemento);//se emite evento 'NoEncontrado'
      break;
      default: //N>=0 si el elemento se encuentra emitimos evento 'encontrado'
      while (posicion != -1) { //encontrar todos los índices del elemento
      self.emit('encontrado',elemento, posicion);
      /*seguimos buscando en el resto del array, partiendo de la próxima posición*/
      posicion = self.muestra.indexOf(elemento, posicion + 1);
      }
    }
   })
   self.emit('fin');//fin de la búsqueda
  }

info(){
  var nEventos=this._eventsCount;
  var eventos=JSON.stringify(this.eventNames());
  var fnEnc=this.listeners('encontrado');
  var fnNoEnc=this.listeners('NoEncontrado');
  var fnFin=this.listeners('fin');
  var nEnc=this.listenerCount('encontrado');
  var nNoEnc=this.listenerCount('NoEncontrado');
  var nFin=this.listenerCount('fin');
  console.log('\nInformación del objeto "buscador":');
  console.log(` Nº eventos que se escuchan: ${nEventos} => ${eventos}`);
  console.log(` Nº funciones evento "encontrado": ${nEnc} =>`,fnEnc);
  console.log(` Nº funciones evento "NoEncontrado": ${nNoEnc} =>`,fnNoEnc);
  console.log(` Nº funciones evento "fin": ${nFin} =>`,fnFin);
}
}
module.exports = Buscador;
