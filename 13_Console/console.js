const Console = require('console').Console;

const cadena=' %d Hola esto es una cadena %s'
let consolaProceso=new Console(process.stdout, process.stderr);
consolaProceso.log(cadena, 1, 'impresa por una instancia de "Console"');
//1 Hola esto es una cadena impresa por una instancia de "Console"
console.log(cadena, 1, 'impresa por la instancia global "console"')
//1 Hola esto es una cadena impresa por la instancia global "console"

const fs=require('fs');
const salida = fs.createWriteStream('./stdout.log');
const error = fs.createWriteStream('./stderr.log');

const registra = new Console(salida, error);

for (let n=0; n<5; n++){
  registra.log('%d out: %s', n, 'log --');
  console.log('%d out: %s', n, 'log --');
}
/*
0 out: log --
1 out: log --
2 out: log --
3 out: log --
4 out: log --*/

registra.error(new Error('Se ha registrado un error'));
console.error(new Error('Se ha registrado un error'));
//Error: Se ha registrado un error. . .


let obj={//nivel1
         nombre:'Jose',
         apellidos:'García',
         pertenecias:['cartera', 'gafas', 'llaves', 'movil'],
         jugar:function (min, max) {
           return Math.random() * (max - min) + min;
         },
        contacto:{//nivel1
              domicilio:{//nivel2
                     calle:{//nivel3
                       nombre:'nombre calle',
                       numero: 7,
                       cp: 28888
                     }
             },
              telefono:{//nivel2
                      fijo:911111,
                      movil:6000000
             }
         },
     }


console.dir(obj,{depth:null, colors:true});
registra.dir(obj,{depth:null, showHidden:true});

function tres () {
  const mensaje='Mostramos el seguimiento';
  console.trace(mensaje);
  registra.trace(mensaje);
  console.log('función tres .....')
}
function dos () {
  tres();
 }
function uno () {
   dos();
 }
uno();
/*Trace: Mostramos el seguimiento
    at tres (console.js:62:11)
    at dos (console.js:67:3)
    at uno (console.js:70:4)
    at . . .
función tres .....*/

const etiqueta1='temporizador-1'
const etiqueta2='temporizador-2'
console.time(etiqueta1);
console.time(etiqueta2);
registra.time(etiqueta1);
registra.time(etiqueta2);
setTimeout(function () {
  console.timeEnd(etiqueta2);//temporizador-2: 3013.405ms
  registra.timeEnd(etiqueta2);
}, 3000);
setTimeout(function () {
  console.timeEnd(etiqueta1);//temporizador-1: 2004.773ms
  registra.timeEnd(etiqueta1);
}, 2000);




setTimeout(function(){
  const a=1;
  const b=2
  const s='hola';
  console.assert((a===1), 'Esto no se imprimirá');
  // OK
  console.assert((typeof s==='string'),'Esto no se imprimirá');
  //OK
  console.assert((a===b), 'Prueba fallida %d no es igual a %d', a,b);
  //AssertionError: Prueba fallida 1 no es igual a 2 ...
},4000);
