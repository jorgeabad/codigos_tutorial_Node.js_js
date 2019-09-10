const util = require('util');

const jugador={nombre:'Juan', apellidos:'Gómez'}
let format='%s con %d votos un %d% del total, es: %j \n'

process.stdout.write(util.format(format, 'Ganador', 100, 75, jugador));
//Ganador con 100 votos un 75% del total, es: {"nombre":"Juan","apellidos":"Gómez"}

process.stdout.write(util.format(format, 'Ganador', 100, 75));
//Ganador con 100 votos un 75% del total, es: %j

format='%s con %d votos un %d% del total, es: %j'
process.stdout.write(util.format(format, 'Ganador', 100, 75, jugador, '100$ \n'));
//Ganador con 100 votos un 75% del total, es: {"nombre":"Juan","apellidos":"Gómez"} 100$
