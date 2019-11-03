//Proveedor
function no_bloqueante(dato, callback) {
  if (dato === "")
    //Hay error
    setTimeout(() => callback(Error("parámetro no valido")), 1500);
  else {
    //No hay eror
    setTimeout(() => callback(null, "BIENVENIDO " + dato.toUpperCase()), 1000); //Error establecido a null
  }
}

//Cliente
let param_a = "";
let param_b = "Jorge";

function cb(error, data) {//callback
  if (error) console.error("Ocurrió un error: " + error);
  else console.log(data);
}

console.log("enviado el dato: " + param_a);//enviado el dato:
no_bloqueante(param_a, cb);

console.log("enviado el dato: " + param_b);//enviado el dato: Jorge
no_bloqueante(param_b, cb);
/*BIENVENIDO JORGE
Ocurrió un error: Error: parámetro no valido*/ 