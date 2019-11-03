function Animal() {
  this._vivo = true;
  this._desplazamiento = true;
  this._fotosintesis = false;
}
Animal.prototype.getFoto = function() {
  return this._fotosintesis;
};

function Can() {
  //llamamos al constructor padre asignamos a "this" las propiedades de function.
  Animal.call(this);
  this._sonido = "ladrido";
  this._patas = 4;
}
Can.prototype.getSonido = function() {
  return this._sonido;
};
/*Se establece para los objetos creados mediante "new Can()"
como prototipo de su prototipo el objeto "Animal.prototype"*/
Can.prototype.__proto__ = Animal.prototype;

function Perro(nombre, raza, edad) {
  Can.call(this);
  this._nombre = nombre;
  this._raza = raza;
  this._edad = edad;
}
Perro.prototype.getNombre = function() {
  return this._nombre;
};
/*Se establece para los objetos creados mediante "new Perro()"
como prototipo de su prototipo el objeto "Can.prototype"*/
Perro.prototype.__proto__ = Can.prototype;

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
