"use strict";
const request = require("request"); //objeto realizar peticiones http GET
let listado = "\n Películas título/fecha:\n"; //Cadena para almacenar información
const url_base = "http://swapi.co/api/films/"; //url base petición

function peticionAsincrona(id, callback) {
  let opciones = { url: url_base + id, json: true };
  console.log("| PEDIMOS datos a: " + opciones.url);
  request.get(opciones, function(error, respuesta, datos) {
    //asíncrono
    let salida;
    !error && respuesta.statusCode == 200
      ? (salida = datos)
      : (salida = error || respuesta.statusCode);
    callback(opciones.url, salida); //se ejecuta depués de recibir la respuesta
  }); // fin request
}

function finRespuesta(url, respuesta) {
  console.log("| RESPUESTA a " + url);
  let mensaje;
  respuesta.title
    ? ((mensaje = "| devuelve título: " + respuesta.title),
      (listado =
        listado + "\n -" + respuesta.title + "/" + respuesta.release_date))
    : (mensaje = "| devuelve error: " + respuesta);
  console.log(mensaje);
  console.log("|_FIN de la respuesta a", url);
}

console.log("\n Comenzamos a realizar las solicitudes http: \n");

for (let id = 1; id < 8; id++) {
  peticionAsincrona(id, finRespuesta);
}

console.log(listado);
console.log(" --- fin del programa ---\n");
