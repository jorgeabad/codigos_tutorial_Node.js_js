const fs=require('fs');
const path=require('path');
const dir0='./test'
const dir1='café'//NFD
const dir2='café'//NFC
const cadena='./café'
const ruta_NFD=path.join(dir0,dir1);

let e_compuesta='\u00E9';
let e_compuesta_2=Buffer.from('c3a9','hex');
let e_descompuesta='\u0065'+'\u0301';
let e_descompuesta_2=Buffer.from([0x65,0xcc,0x81]);
console.log('é Compuesta:', e_compuesta, e_compuesta_2);
console.log('é Descopuesta:', e_descompuesta, e_descompuesta_2);

console.log('\ndir1=',dir1,Buffer.from(dir1));
console.log('dir2=',dir2,Buffer.from(dir2));
fs.mkdirSync(dir0);// ./test
fs.mkdirSync(ruta_NFD);// ./test/café
console.log('\ncontenido del directorio',dir0);
console.log(fs.readdirSync(dir0,{encoding:'buffer'}));

function find(elemento, ruta, norma){
  console.log(norma ? '\nNormalizamos a '+norma:'\n');
  let elementoNormalizado = norma ? elemento.normalize(norma) : elemento;
  console.log('Buscamos el elemento', elementoNormalizado);
  let dir=fs.readdirSync(ruta,{encoding:'utf-8'});
  let encontrado=false;
  dir.forEach(function(e){
  let eNormalizado = norma ? e.normalize(norma) : e;
  encontrado = (eNormalizado===elementoNormalizado) ? true : false;
  });
  console.log(encontrado ? 'Encontrado '+elementoNormalizado:'No encontrado '+elementoNormalizado);
}

find(dir1, dir0);
find(dir2, dir0);

find(dir1, dir0,'NFC');
find(dir2, dir0,'NFC');
find(dir1, dir0,'NFD');
find(dir2, dir0,'NFD');
/*

console.log(dir1.normalize('NFC'));
console.log(dir2.normalize('NFC'));
console.log(dir1.normalize('NFC')===dir2.normalize('NFC'));
console.log(dir1.normalize('NFD')===dir2.normalize('NFD'));

let nfc=Buffer.from(cadena.normalize('NFC'));
let nfd=Buffer.from(cadena.normalize('NFD'));

let str_nfc=cadena.normalize('NFC');
let str_nfd=cadena.normalize('NFD');

console.log(nfc);
console.log(str_nfc);
console.log(nfd);
console.log(str_nfd);


fs.mkdirSync(str_nfc);
fs.mkdirSync(str_nfd);
console.log(fs.readdirSync('.',{encoding:'UTF-8'}));

let dir=fs.readdirSync('.',{encoding:'utf-8'});

dir.forEach(function(archivo){
console.log(archivo.toString('utf-8'), archivo, archivo.length);
fs.appendFileSync('resultado.txt', archivo+',' , {encoding:'utf-8', flags:'r+'});
});
console.log(fs.readdirSync('.',{encoding:'buffer'}));
/*console.log(fs.readdirSync('G:\\test',{encoding:'buffer'}));
console.log(fs.readdirSync('G:\\test'));*/
/*const defaults = {
  encoding: 'buffer',
};

console.log(fs.readFileSync('resultado.txt','utf-8'));*/
