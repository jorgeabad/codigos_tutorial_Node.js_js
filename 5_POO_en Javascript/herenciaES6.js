class Animal {
  constructor() {
    this._vivo = true;
    this._desplazamiento = true;
    this._fotosintesis = false;
  }
  getFoto() {
    return this._fotosintesis;
  }
}

class Can extends Animal {
  constructor() {
    super();
    this._sonido = "ladrido";
    this._patas = 4;
  }
  getSonido() {
    return this._sonido;
  }
}

class Perro extends Can {
  constructor(nombre, raza, edad) {
    super();
    this._nombre = nombre;
    this._raza = raza;
    this._edad = edad;
  }
  getNombre() {
    return this._nombre;
  }
}

let p3 = new Perro("Ali", "Bichon", 3);
console.log(p3._vivo); //true
console.log(p3.getNombre(), p3.getSonido(), p3.getFoto()); //Ali ladrido false
console.log(Perro.prototype.constructor == Perro); // true
console.log(p3.__proto__ === Perro.prototype); //true
console.log(p3.__proto__.__proto__ === Can.prototype); //true
console.log(p3.__proto__.__proto__.__proto__ === Animal.prototype); //true
console.log(p3.__proto__.__proto__.__proto__.__proto__ === Object.prototype); //true

for (let clave in p3) {
  //claves, valor
  console.log(clave, p3[clave]);
  /*nombre manzanas
precio 0.5
categoria golden*/
}
