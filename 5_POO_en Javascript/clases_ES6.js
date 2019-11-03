class Perro {
  constructor(nombre, raza, edad) {
    this._nombre = nombre;
    this._raza = raza;
    this._edad = edad;
  }
  getNombre() {
    return this._nombre;
  }
}

let p1 = new Perro("Bob", "Labrador", 2);
let p2 = new Perro("Bola", "Carlino", 1);
console.log(p2.getNombre()); //Bola
console.log(p1.getNombre()); //Bob
//por defecto
//Perro.prototype = { constructor: Perro }
console.log(Perro.prototype.constructor == Perro); // true
console.log(Perro.prototype.__proto__ === Object.prototype); // true
console.log(Perro.__proto__); //Function
