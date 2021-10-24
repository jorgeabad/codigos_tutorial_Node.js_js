const { Transform } = require("stream")

class MyTransform extends Transform{

    _transform(chunk,encoding,callback){
        this.push(chunk.toString().toUpperCase());
        callback();
    }
}

let myTransform = new MyTransform();

myTransform.on("data",(chunk)=>{
    console.log(chunk.toString());
})

myTransform.write("Hola amigos");

//HOLA AMIGOS