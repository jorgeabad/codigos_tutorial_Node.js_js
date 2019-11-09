"use strict";
const request = require("request"); //objeto realizar peticiones http GET
let listado = "\n Películas título/fecha:\n"; //Cadena para almacenar información
let url_base = "http://swapi.co/api/films/"; //url base petición
const events = require("events");
let peticion = new events.EventEmitter();

peticion.on("fin", finRespuesta);
peticion.on("siguiente", secuenciamiento);
peticion.on("listado", () => console.log(listado));

function secuenciamiento(id) {
  id++;
  id < 9 ? peticionAsincrona(id) : peticion.emit("listado");
}

function peticionAsincrona(id, callback) {
  let opciones = { url: url_base + id, json: true };
  console.log("| PEDIMOS datos a: " + opciones.url);
  //petición asíncrona
  request.get(opciones, function(error, respuesta, datos) {
    let salida = { url: opciones.url };//almacena url petición y datos de salida
    !error && respuesta.statusCode == 200
      ? ((salida.contenido = datos),  peticion.emit("fin", null, salida))//exito
      : ((error = error || respuesta.statusCode),peticion.emit("fin",error, salida));//fracaso
      peticion.emit("siguiente", id);  
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



console.log("\n Comenzamos a realizar las solicitudes http: \n");
peticionAsincrona(1);
