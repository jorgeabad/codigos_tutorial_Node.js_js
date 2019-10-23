

const fs = require("fs");



const firmaPng=Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);//firma del PNG
const fragmentoIHDR=Buffer.from([73,72,68,82]);//"IHDR" Buffer.from(array de enteros)
const fragmentoIEND=Buffer.from([73, 69, 78, 68]);//"IEND" Buffer.from(array de enteros)
function esPNG (buffer) {
  //comparamos los 8 primeros bytes de un Buffer con la firma png
  if (buffer.compare(firmaPng, 0, 8, 0, 8)===0) {//si son iguales
    const Type=Buffer.alloc(4);//4 bytes para el contenido TYPE de IHDR
    //Después de 8 bytes de firma viene el fragmento IHDR
    //el campo TYPE de IHDR de empieza en la posicion 12 son 4 bytes
    buffer.copy(Type, 0, 12, 16)//copiamos el contenido de TYPE en Type
    if (!Type.equals(fragmentoIHDR)) {// si no coincide con "IHDR"
      throw new TypeError('png no valido');
    }
    console.log('encontrado fragmento',Type.toString('utf8'))
    //Extraemos contenido de las posiciones correspondientes al campo type de IEND
    const fin = buffer.toString('utf8', buffer.length-8, buffer.length-4);
    if (fin===fragmentoIEND.toString('utf8')) {// si coincide con "IEND"
      console.log('encontrado fragmento',fin)
    }
    return true;//es un png
  }
}
/*Partiendo de los datos del buffer creamos una cadena usando base64 */
function encode_base64(buffer){
  let png_base64=buffer.toString('base64');
  return png_base64;
}

function dimension (buffer) {
  return {
    //4 bytes después de TYPE de frag IHDR
    'anchura': buffer.readUInt32BE(16),//Lee 32 bits sin signo (Big Endian)
    'altura': buffer.readUInt32BE(20)
  };
}

//Lee de forma síncrona todo el contenido de un archivo.
const imgData = fs.readFileSync('happy.png');
if (esPNG(imgData)){//si es png muestra dimensiones y uri de datos
console.log(dimension(imgData));
console.log('data:image/png;base64,',encode_base64(imgData));
}
