/******************GENERADORAS********************/
"use strict";
const request = require("request"); //objeto realizar peticiones http GET
let listado = "\n Películas título/fecha:\n"; //Cadena para almacenar información
const url_base = "http://swapi.co/api/films/"; //url base petición
let cont = 0;

function peticionAsincrona(id, callback) {
  let opciones = { url: url_base + id, json: true };
  console.log("| PEDIMOS datos a: " + opciones.url);
  //petición asíncrona
  request.get(opciones, function(error, respuesta, datos) {
    let salida = { url: opciones.url };//almacena url petición y datos de salida
    !error && respuesta.statusCode == 200
      ? ((salida.contenido = datos), callback(null, salida))//exito
      : ((error = error || respuesta.statusCode),callback(error, salida));//fracaso
  }); // fin request
}

function* generadora(callback) {
  //función que lanza las peticiones
  for (let id = 1; id < 9; id++) {
    peticionAsincrona(id, callback);
  }
  yield; //(1) una vez se han lanzada las peticiones salimos.
  console.log(listado + "\n --- fin del programa ---");
}

const iterador = generadora(finRespuesta);

function finRespuesta(error, res) {//callback para "peticionAsincrona"
  console.log("| RESPUESTA a " + res.url);
  let mensaje;
  !error
    ? ((mensaje = "| devuelve título: " + res.contenido.title),//exito
      (listado =`${listado}\n${res.contenido.title}/${res.contenido.release_date}`))
    : (mensaje = "| devuelve error: " + error);//fracaso
  console.log(mensaje);
  console.log("|_FIN de la respuesta a", res.url);
  cont++;
  cont === 8 ? iterador.next(): ""; /*una vez obtenido todas las respuestas
  se vuelve a entrar en la función generadora después de yield (1)*/
}


console.log("\n Comenzamos a realizar las solicitudes http: \n");
iterador.next(); //ejecuta la función generadora hasta yield (1)
