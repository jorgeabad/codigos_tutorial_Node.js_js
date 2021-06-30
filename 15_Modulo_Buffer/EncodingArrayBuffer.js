const encoder = new TextEncoder()
const decoder = new TextDecoder()

console.log('ñ'.codePointAt(0));//241
//dec=241 hex=F1 bin=11110001 => utf-8 (11000011 10110001 -> c3b1 -> 2bytes [195, 177]
const str1u8 = new Uint8Array([195,177]);//Generamos un búfer con los datos oportunos.
console.log(str1u8)//[195,177]
let str1 = decoder.decode(str1u8)//decodificamos el bufer
console.log(str1)//ñ
console.log(str1.length);//1
console.log(str1.codePointAt());//241

let string1 = '\u00F1';
console.log(string1);//ñ
console.log(string1===str1);//true

const vista = encoder.encode(str1)
console.log(vista);//[195,177]

const ene='n'
const diacritica='̃'
console.log(ene.codePointAt(0));//110
//dec=110 hex=6E bin=01101110 => utf-8 -> 01101110 -> 6E -> 1 byte [110]
console.log(diacritica.codePointAt(0));//771
//dec=771 hex=0x303 bin=1100000011 => utf-8 (11001100 10000011-> cc83 -> 2 bytes [204, 131].
const u8 = new Uint8Array([110,204,131]);//Generamos un búfer con los datos oportunos.
console.log(u8)//[110,204,131]
let str2 = decoder.decode(u8)//decodificamos el bufer
console.log(str2)//ñ
console.log(str2.length);//2 hemos usado dos caracteres
//Hallamos el punto de código de cada caracter.
console.log(str2.codePointAt(0));//110
console.log(str2.codePointAt(1));//771

let string2 = '\u006E\u0303';
console.log(string2);//ñ
console.log(string2===str2);//true

const vista2 = encoder.encode(str2)
console.log(vista2);//[110,204,131]


//comparamos las dos cadenas string1='\u00F1' y string2='\u006E\u0303'
console.log(string1 === string2); // false
console.log(string1.length);      // 1
console.log(string2.length);      // 2

//Convertimos string1 '\u00F1' a su forma descompuesta
string1 = string1.normalize('NFD');//ñ
console.log(string1 === string2); // true
console.log(string1.length);      // 2
console.log(string2.length);      // 2
console.log(string1.codePointAt(0).toString(16)); //6E
console.log(string1.codePointAt(1).toString(16)); //303

//Convertimos string2 y string1 \u006E\u0303 a sus formas compuesta
string1 = string1.normalize('NFC');//ñ
string2 = string2.normalize('NFC');//ñ

console.log(string1 === string2);// true
console.log(string1.length);// 1
console.log(string2.length);//1
console.log(string2.codePointAt(0).toString(16)); //f1
console.log(string1.codePointAt(0).toString(16)); //f1
