/**JavaScript ArrayBuffer TypedArray **********/
const memoria = new ArrayBuffer(2);
const vista8 = new Uint8Array(memoria);
const vista16 = new Uint16Array(memoria);
vista8[0] = 255; //11111111
vista8[1] = 128; //10000000
console.log(vista8); //Uint8Array [ 255, 128 ]
//LE byte menos significativo 1º
console.log(vista16, vista16[0].toString(2)); //Uint16Array [ 33023 ] '1000000011111111'

vista16[0] = 65408; //1111111110000000
console.log(vista16); //Uint16Array [ 65408 ]
console.log(vista8, vista8[0].toString(2), vista8[1].toString(2));
//Uint8Array [ 128, 255 ] '10000000' '11111111'

vista16[0] = 1000; //0000001111101000
console.log(vista16); //Uint16Array [ 1000 ]
console.log(vista8, vista8[0].toString(2), vista8[1].toString(2));
//Uint8Array [ 232, 3 ] '11101000' '11'

/**Buffer.allocUnsafe******************************************************** */
console.log(Buffer.poolSize); //8192
console.log(Buffer.allocUnsafe(8)); //<Buffer b0 1f 62 30 0a 00 00 00>
console.log(Buffer.allocUnsafeSlow(8)); //<Buffer e8 d5 40 30 0a 00 00 00>
console.log(Buffer.allocUnsafe(8).fill(0)); //<Buffer 00 00 00 00 00 00 00 00>
console.log(Buffer.allocUnsafeSlow(8).fill(0)); //<Buffer 00 00 00 00 00 00 00 00>

/**Buffer.alloc()************************************************************** */
//Creamos un buffer 'buf0' de 5 bytes inicializado a ceros.
const buf0 = Buffer.alloc(5);
console.log("buf0:", buf0); //buf0: <Buffer 00 00 00 00 00>
//modificamos el primer byte de buf0 asignándole el valor 1
buf0[0] = 1;
console.log("buf0:", buf0); //buf0: <Buffer 01 00 00 00 00>

const bufi = Buffer.alloc(2, 255);
console.log("bufi", bufi); //bufi <Buffer ff ff>
console.log("bufi[0]", bufi, bufi.readUInt8(0)); //bufi[0] <Buffer ff ff> 255
console.log("bufi[1]", bufi, bufi.readUInt8(1)); //bufi[1] <Buffer ff ff> 255
bufi[0] = 1;
console.log("bufi[0]", bufi, bufi.readUInt8(0)); //bufi[0] <Buffer 01 ff> 1
console.log("bufi", bufi, bufi.readUInt16BE()); //bufi <Buffer 01 ff> 511
console.log("bufi", bufi, bufi.readUInt16LE()); //bufi <Buffer 01 ff> 65281
bufi[0] = -2;
console.log("bufi[0]", bufi, bufi.readInt8(0)); //bufi[1] <Buffer fe ff> -2
console.log("bufi[0]", bufi, bufi.readUInt8(0)); //bufi[1] <Buffer fe ff> 254

/*Creamos un nuevo buffer 'buf1' de 10 bytes y lo llenamos
 con buf0*/
const buf1 = Buffer.alloc(12, buf0);
console.log("buf1:", buf1); //buf1: <Buffer 01 00 00 00 00 01 00 00 00 00 01 00>

//Creamos un buffer de 2 bytes pasándole un string codificado en utf8
const buf2 = Buffer.alloc(2, "ñ");
console.log("buf2:", buf2, buf2.toString()); //buf2: <Buffer c3 b1> ñ
//Creamos un buffer de 1 byte pasándole un string codificado en latin1
const buf3 = Buffer.alloc(1, "ñ", "latin1");
console.log("buf3:", buf3, buf3.toString("latin1")); //buf3: <Buffer f1> ñ
//Creamos un buffer de 2 bytes pasándole en la cadena el punto de código unicode
const bufUnicode = Buffer.alloc(2, "\u00F1", "utf8"); //ñ
console.log("bufUnicode:", bufUnicode, bufUnicode.toString()); //bufUnicode: <Buffer c3 b1> ñ
//Creamos un buffer de 3 bytes pasándole una cadena con la combinación de dos puntos de código unicode
const bufUniCompuesto = Buffer.alloc(3, "\u006E\u0303", "utf8");
console.log("bufUniCompuesto:", bufUniCompuesto, bufUniCompuesto.toString()); //bufUniCompuesto: <Buffer 6e cc 83> ñ

/**Buffer.from(string[, encoding])***********************/
const buf5 = Buffer.from("Buenos días UAH");
console.log("buf5: ", buf5, buf5.toString(), buf5.length, "bytes");
//buf5:  <Buffer 42 75 65 6e 6f 73 20 64 c3 ad 61 73 20 55 41 48> Buenos días UAH 16 bytes
const buf5Latin = Buffer.from("Buenos días UAH", "latin1");
console.log(
  "buf5Latin: ",
  buf5Latin,
  buf5Latin.toString("latin1"),
  buf5Latin.length,
  "bytes"
);
//buf5Latin:  <Buffer 42 75 65 6e 6f 73 20 64 ed 61 73 20 55 41 48> Buenos días UAH 15 bytes
console.log("ascii", buf5.toString("ascii")); //ascii Buenos dC-as UAH
console.log("latin-1", buf5.toString("latin1")); ////latin-1 Buenos dÃ­as UAH
const buf6 = Buffer.from("4275656e6f732064c3ad617320554148", "hex");
console.log("buf6:", buf6, buf6.toString(), buf6.length, "bytes");
//buf6: <Buffer 42 75 65 6e 6f 73 20 64 c3 ad 61 73 20 55 41 48> Buenos días UAH 16 bytes
const buf_compuesto = Buffer.from("\u006E\u0303", "utf8"); //Unicode U+006E "n" + U+0303 “~”.
console.log(
  "buf_compuesto",
  buf_compuesto,
  buf_compuesto.toString(),
  buf_compuesto.length,
  "bytes"
);
//buf_compuesto <Buffer 6e cc 83> ñ 3 bytes

/**Buffer.from(buffer)********************************/
const buf7 = Buffer.from(buf6);
buf7[0] = 0x62;
console.log("buf7:", buf7, buf7.toString());
//buf7: <Buffer 62 75 65 6e 6f 73 20 64 c3 ad 61 73 20 55 41 48> buenos días UAH

/**Buffer.from(array)*********/
console.log(Buffer.from([195, 177]).toString()); //ñ
console.log(Buffer.from([0xc3, 0xb1]).toString()); //ñ
console.log(Buffer.from([195, 0xb1]).toString()); //ñ
console.log(Buffer.from([0xf1]).toString("latin1")); //ñ
console.log(Buffer.from([0x6e, 0xcc, 0x83]).toString()); //ñ;

/**Buffer.from(ArrayBuffer)******************/
const miBuffer = new ArrayBuffer(2);
const vista = new Uint8Array(miBuffer);
const vista2 = new Uint16Array(miBuffer);
vista[0] = 195;
vista[1] = 177;
console.log(miBuffer); //ArrayBuffer { byteLength: 2 }
console.log(vista); //Uint8Array [ 195, 177 ]
console.log(vista2); //Uint16Array [ 45507 ]
const buf = Buffer.from(vista.buffer);
console.log(buf, buf.toString()); //<Buffer c3 b1> 'ñ'
vista[1] = 145;
console.log(buf, buf.toString()); //<Buffer c3 91> 'Ñ'

/**Buffer.fill()*******************/

const buf4 = Buffer.alloc(3, "e29880", "hex"); //U2600; bytes (hex e29880, dec [226 152 128]); char:☀
console.log("buf4:", buf4, buf4.toString());
//buf4: <Buffer e2 98 80> ☀

//llenamos buf1 con la cadena 'hola' en utf8
buf1.fill("hola");
console.log("buf1:", buf1, buf1.toString());
//buf1: <Buffer 68 6f 6c 61 68 6f 6c 61 68 6f 6c 61> holaholahola

//llenamos a partir del 4º byte hasta el 9º byte incluido con cadena de 5 bytes.
buf1.fill(" UAH ", 4, 9);
console.log("buf1:", buf1, buf1.toString());
//buf1: <Buffer 68 6f 6c 61 20 55 41 48 20 6f 6c 61> hola UAH ola

//llenamos a partir del 9º byte hasta el 12º byte incluido con otro buffer de 3 bytes.
buf1.fill(buf4, 9, 12);
console.log("buf1:", buf1, buf1.toString());
//buf1: <Buffer 68 6f 6c 61 20 55 41 48 20 e2 98 80> hola UAH ☀

//llenamos a partir del 9º byte hasta el 12º byte incluido con '!' el código 33 en utf8
buf1.fill(33, 9, 12);
console.log("buf1:", buf1, buf1.toString());
//buf1: <Buffer 68 6f 6c 61 20 55 41 48 20 21 21 21> hola UAH !!!

//llenamos a partir del 9º byte hasta el 12º byte incluido con el caracter unicode u2661.
buf1.fill("\u2661", 9, 12);
console.log("buf1:", buf1, buf1.toString());
//buf1: <Buffer 68 6f 6c 61 20 55 41 48 20 e2 99 a1> hola UAH ♡

//llenamos a partir del 9º byte hasta el 12º byte incluido con 3 bytes.
buf1.fill("e29880", 9, 12, "hex");
console.log("buf1:", buf1, buf1.toString());
//buf1: <Buffer 68 6f 6c 61 20 55 41 48 20 e2 98 80> hola UAH ☀

/**buf.write() *******************/
buf1.write("bye!");
console.log("buf1:", buf1, buf1.toString());
//buf1: <Buffer 62 79 65 21 20 55 41 48 20 e2 98 80> bye! UAH ☀

buf1.write("e298be", 9, 3, "hex");
console.log("buf1:", buf1, buf1.toString());
//buf1: <Buffer 62 79 65 21 20 55 41 48 20 e2 98 be> bye! UAH ☾

/**Buffer.compare(buf1, buf2) **************************/
const item1 = Buffer.from("Barcelona");
console.log("item1:", item1, item1.toString());
const item2 = Buffer.from("Almería");
console.log("item2:", item2, item2.toString());
const item3 = Buffer.from("Valencia");
console.log("item3:", item3, item3.toString());
const item4 = Buffer.from("Madrid");
console.log("item4:", item4, item4.toString());
const item5 = Buffer.from("Valencia");
console.log("item5:", item5, item5.toString());
/*
item1: <Buffer 42 61 72 63 65 6c 6f 6e 61> Barcelona
item2: <Buffer 41 6c 6d 65 72 c3 ad 61> Almería
item3: <Buffer 56 61 6c 65 6e 63 69 61> Valencia
item4: <Buffer 4d 61 64 72 69 64> Madrid
item5: <Buffer 56 61 6c 65 6e 63 69 61> Valencia*/

console.log("item1 vs item2:", Buffer.compare(item1, item2)); //1
console.log("item2 vs item1:", Buffer.compare(item2, item1)); //-1
console.log("item5 vs item3:", Buffer.compare(item5, item3)); //0

console.log(item1.compare(item2)); //1
console.log(item2.compare(item1)); //-1
console.log(item5.compare(item3)); //0

console.log(item3.equals(item1)); //false
console.log(item3.equals(item5)); //true

/**buf.compare(target[, targetStart[, targetEnd[, sourceStart[, sourceEnd]]]])*/
console.log(item1.compare(item3, 1, 2, 1, 2)); // 0 (a===a)
console.log(item1.compare(item2, 1, 2, 1, 2)); //-1 (l>a)
console.log(item2.compare(item3, 2, 3, 1, 2)); //0 (l===l)
const buf_1 = Buffer.from([0, 1, 2, 3]);
const buf_2 = Buffer.from([2, 3, 0, 1]);
console.log(buf_1.compare(buf_2, 0, 1, 2, 3)); //0 (0===0)
console.log(buf_1.compare(buf_2, 1, 2, 3, 4)); //0 (3===3)
console.log(buf_1.compare(buf_2, 2, 4, 0, 2)); //0 [0,1]==[0,1]
console.log(buf_1.compare(buf_2, 0, 1, 0, 1)); //-1 (2 > 0)
console.log(buf_1.compare(buf_2, 3, 4, 3, 4)); //1 (1 < 3)

const lista = [item1, item2, item3, item4];
console.log("lista:", lista.toString()); //lista: Barcelona,Almería,Valencia,Madrid
console.log("lista ordenada:", lista.sort(Buffer.compare).toString());
/*lista ordenada: Almería,Barcelona,Madrid,Valencia*/

/**Buffer.concat(list[, totalLength]) *********************/
const sep = Buffer.from(", ");
const lista2 = [item1, sep, item2];
const conc = Buffer.concat(lista2);
console.log(conc, conc.toString()); //<Buffer 42 61 72 63 65 6c 6f 6e 61 2c 20 41 6c 6d 65 72 c3 ad 61> 'Barcelona, Almería'
const conc2 = Buffer.concat(lista2, 10);
console.log(conc2, conc2.toString()); //<Buffer 42 61 72 63 65 6c 6f 6e 61 2c> 'Barcelona,'

/**buf.copy()***************** */
const bufcopia = Buffer.alloc(3);
buf1.copy(bufcopia, 0, 5, 8); //copiamos en bufcopia el 6º, 7º y 8º byte de buf1
console.log("bufcopia", bufcopia, bufcopia.toString());
//bufcopia <Buffer 55 41 48> UAH

/**iteradores **********************************************/
console.log("\nIteradores");
console.log("iteramos:", item1); //<Buffer 42 61 72 63 65 6c 6f 6e 61>
for (let b of item1) {
  console.log(b, b.toString(16), String.fromCharCode(b));
}
/* 66 '42' 'B'
97 '61' 'a'
114 '72' 'r'
99 '63' 'c'
101 '65' 'e'
108 '6c' 'l'
111 '6f' 'o'
110 '6e' 'n'
97 '61' 'a'
*/
for (let par of item1.entries()) {
  console.log(par);
}
//[ 0, 66 ] [ 1, 97 ] [ 2, 114 ] [ 3, 99 ] [ 4, 101 ] [ 5, 108 ] [ 6, 111 ] [ 7, 110 ] [ 8, 97 ]
for (let valor of item1.values()) {
  console.log(valor);
}
//66 97 114 99 101 108 111 110 97

/**buf.slice*********************************************************** */
const sliceItem1 = item1.slice(5, 9);
console.log(sliceItem1.toString()); //lona
//item1 y sliceItem1 comparten memoria
sliceItem1.fill("*"); //modifica memoria original
console.log(item1.toString()); //Barce****
