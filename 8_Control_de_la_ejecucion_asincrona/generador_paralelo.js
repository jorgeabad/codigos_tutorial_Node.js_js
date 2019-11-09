/******************GENERADORAS********************/
"use strict";
const request = require("request"); //objeto realizar peticiones http GET
let listado = "\n Películas título/fecha:\n"; //Cadena para almacenar información
const url_base = "http://swapi.co/api/films/"; //url base petición

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

function finRespuesta(error, res) {//callback para "peticionAsincrona"
  console.log("| RESPUESTA a " + res.url);
  let mensaje;
  !error
    ? ((mensaje = "| devuelve título: " + res.contenido.title),//exito
      (listado =`${listado}\n${res.contenido.title}/${res.contenido.release_date}`))
    : (mensaje = "| devuelve error: " + error);//fracaso
  console.log(mensaje);
  console.log("|_FIN de la respuesta a", res.url);
}

function* generadora(callback) { //función que lanza las peticiones
    for (let id = 1; id < 9; id++) {
      peticionAsincrona(id, callback);
    }
    console.log(listado + "\n --- fin del programa ---");
  }
  
const iterador = generadora(finRespuesta);
console.log("\n Comenzamos a realizar las solicitudes http: \n");
iterador.next(); //ejecuta la función generadora.
