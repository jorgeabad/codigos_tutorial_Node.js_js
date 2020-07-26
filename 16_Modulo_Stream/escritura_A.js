const Writer = require("./StreamEscritura");
const destino = [];//estructura donde se quiere escribir.

 //instanciamos un flujo de escritura hacia el recurso destino
 //configurando un HWM de 3 bytes para el búfer interno del stream.
const writer = new Writer({ highWaterMark: 3 }, destino);

//función callback para pasar al método writer.end()
const final=function() {//cuando no hay mas datos para ser depositados en el stream.
  console.log('\nWriter "end" no hay mas datos para pasar al stream.');
}

for (let i = 0; i <= 5; i++) {
  //simula la llegada de fragmentos al flujo de escritura a intervalos
  setTimeout(function() {
    console.log("Se pasa al stream el caracter:", i);
    /*depositamos el fragmento en el flujo de escritura */
    let info = writer.write(i.toString())
      ? i//devuelve "true" writableState.length<HWM
      : i +" Se ha superado HWM ";//false en caso writableState.length>=HWM
    console.log("Se ha depositado en el stream el caracter:", info);
    if (i === 5) {//al llegar a 5 ya no hay mas fragmentos que depositar.
      writer.end(null, "utf8", final); 
    }
  }, i*150); //regula la velocidad con la que se pasa los datos al stream
}

