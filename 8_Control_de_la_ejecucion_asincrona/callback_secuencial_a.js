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
      (listado =`${listado}\n -${res.contenido.title}/${res.contenido.release_date}`))
    : (mensaje = "| devuelve error: " + error);//fracaso
  console.log(mensaje);
  console.log("|_FIN de la respuesta a", res.url);
  if (++cnt === max) {
    //mecanismo para controlar la ejecución de todo.
    console.log(listado);
    console.log(" --- fin del programa ---\n");
  } else {
    peticionAsincrona(cnt, finRespuesta);
  }
}

let cnt = 1,
  max = 9;
console.log("\n Comenzamos a realizar las solicitudes http: \n");
peticionAsincrona(cnt, finRespuesta);
