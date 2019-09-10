const util = require('util');

let proxy = new Proxy({ target1: 'valor1', target2:'valor2' }, {
    get: function(target, property) {
        if (property in target) {
            return target[property];
        } else {
            return 'valor3';
        }
    }
});
console.log(util.inspect(proxy)) //{ target1: 'valor1', target2: 'valor2' }

console.log(util.inspect(proxy,{showProxy:true}))
/*Proxy [ { target1: 'valor1', target2: 'valor2' },
  { get: [Function: get] } ]*/



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
console.log(util.inspect(obj))
console.log(util.inspect(obj,{showHidden:true}))
console.log(util.inspect(obj,{depth:0}))
console.log(util.inspect(obj,{depth:3}))
console.log(util.inspect(obj,{depth:3,colors:true}))
console.log(util.inspect(obj,{colors:true, breakLength:'Infinity'}))
console.log(util.inspect(obj, {maxArrayLength:-1}))








class coche {
  constructor() {
    this.marca = {marca:'Ford', modelo:'Focus', puertas:4};
    this.modelo = 'Focus';
    this.puertas=4;
  }

  inspect(depth, options) {
    const inner = util.inspect(this.marca, {depth:2, colors:true})
    return inner
  }
}

const c = new coche();
console.log(util.inspect(c));
// Returns: "Box< true >"

let objeto={
 p1:1,
 p2:'a',
 p3:[1,2,3,4],
 inspect(depth, options) {
  let pTotal=[this.p1,this.p2,this.p3];
  return util.inspect(pTotal, {depth:2, colors:true})
 }
}
console.log(util.inspect(objeto));

console.log(util.inspect(objeto,{customInspect:false}));
