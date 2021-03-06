/******************PROMESAS*************************/
"use strict";
const request = require("request"); //objeto realizar peticiones http GET
let listado = "\n Películas título/fecha:\n"; //Cadena para almacenar información
const url_base = "http://swapi.co/api/films/"; //url base petición

function requestPromise(id) {
  return new Promise(function(resolve, reject) {
    let opciones = { url: url_base + id, json: true };
    console.log("| PEDIMOS datos a: " + opciones.url);
    request.get(opciones, function(error, respuesta, datos) {
      if (!error && respuesta.statusCode == 200) {
        resolve({ url: opciones.url, datos: datos }); //resuelta
      } else {
        error = error || respuesta.statusCode;
        reject({ url: opciones.url, error: error }); //rechazada
      }
    });
  });
}

//imprime la devolución de la promesa en función de si ha sido resuelta o rechazada
function mostrarRespuesta(resuelta, rechazo) {
  if (resuelta) {
    console.log("| RESPUESTA a " +resuelta.url +
        " devuelve título:" + resuelta.datos.title);
    listado = `${listado} \n -${resuelta.datos.title}/${resuelta.datos.release_date}`;
  } else {
    console.log(
      "| RESPUESTA a " + rechazo.url + " devuelve error: " + rechazo.error
    );
  }
  let url = typeof rechazo !== "undefined" ? rechazo.url : resuelta.url;
  console.log("|_FIN de la petición a", url);
}

console.log("\n Comenzamos a realizar las solicitudes http: \n");
for (let id = 1; id < 9; id++) {
  requestPromise(id)
    .then(objetoResolve => mostrarRespuesta(objetoResolve, undefined))
    .catch(objetoReject => mostrarRespuesta(undefined, objetoReject));
}

console.log(listado);
console.log(" --- fin del programa ---\n");
