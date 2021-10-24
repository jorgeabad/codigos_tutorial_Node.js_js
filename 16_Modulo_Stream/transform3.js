'use strict'
 
const Transform = require('stream').Transform
 
class MiTransform extends Transform {
  constructor(n) {
    super()
    // Rotar la letra por `n` posiciones
    this.offset = (n || 13) % 26
  }
 
  // Transforma los datos escritos por el lado escribible y agrégalos al lado legible
  _transform(buf, enc, next) {
    let res = buf.toString().split('').map(l => {
      let c=l.toLowerCase();
      let code = c.charCodeAt(0)
      if (c >= 'a' && c <= 'z') {
        code += this.offset
        if (code > 'z'.charCodeAt(0)) {
          code -= 26
        }
      } 
      return String.fromCharCode(code)
    }).join('')
         //agregar los datos transformados al lado legible
    this.push(res)
         //para prepararse para el siguiente
    next()
  }
 
}

 
let cifrado = new MiTransform(3)
let descifrado = new MiTransform(26-3)

cifrado.write('HOLA MUNDO!!!\n')
cifrado.end()

cifrado.pipe(process.stdout)//krod pxqgr!!!

cifrado.pipe(descifrado).pipe(process.stdout)//hola mundo!!!
 
/*
krod pxqgr!!!
hola mundo!!!
*/
