/******************GENERADORAS********************/
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

function* generadora(callback) {
  for (let id = 1; id < 9; id++) {
    yield peticionAsincrona(id, callback); //para cada operación asincona marcada con yield
    //yield (1), yield (2) ...yield (7);
  }
}

const iterador = generadora(finRespuesta);

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
  let resu = iterador.next(); /*una vez obtenida la respuesta de la op. asincrona pasamos a la siguiente.
  operación asincrona ->yield (2) -> yield (3) -> yield (4) ...yield (7)*/
  resu.done === true//si hemos obtenidos todos los valores yield
    ? console.log(listado + "\n --- fin del programa ---")
    : "";
}

console.log("\n Comenzamos a realizar las solicitudes http: \n");
iterador.next(); //ejecuta función generadora hasta yield (1)
