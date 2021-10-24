const { Transform } = require('stream')

class TransMayusculas extends Transform {

  _transform (chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
        this.push("\n\r")
        callback()
  }
}

let a_Mayusculas = new TransMayusculas()

process.stdin.pipe(a_Mayusculas).pipe(process.stdout)
/**
hola
HOLA

vamos
VAMOS
 */