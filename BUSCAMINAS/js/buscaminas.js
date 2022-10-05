let maxFilas = prompt('¿Cuántas filas quieres?');
let maxColumnas = prompt('¿Cuántas columnas quieres?');
let numMinas = prompt('¿Cuántas minas quieres introducir?')

/*
// Creamos el tablero en html
document.write('<table>');

for (let i = 0; i < maxFilas; i++) {
    document.write('<tr>');

    for (let j = 0; j < maxColumnas; j++) {
        document.write('<td></td>');
    }

    document.write('</tr>');
}
document.write('</table>');
*/
// Array bidimensional para guardar las minas

let arrayTablero = [];
let contadorMinas = 0;
let posFila;
let posColumna;

for (let fila = 0; fila < maxFilas; fila++) {
    arrayTablero[fila] = [];

    for (let columna = 0; columna < maxColumnas; columna++) {
        arrayTablero[fila][columna] = '';
        
    }
}
/*
while (contadorMinas < numMinas) {
    posFila = Math.floor(Math.random() * maxFilas);
    posColumna = Math.floor(Math.random() * maxColumnas);

    if (arrayTablero[posFila][posColumna] != 'MINA') {
        arrayTablero[posFila][posColumna] = 'MINA'
        contadorMinas++;
    }
}
*/

let F = 1
let C = 1

arrayTablero[F][C] = 'MINA'

if (arrayTablero[F][C] == 'MINA'){

    for (let posiciones = 0;posiciones < 3;posiciones++) {

        if (arrayTablero[F-1][C] == null){
            continue
        }else{
            arrayTablero[F-1][posiciones] = 1
        }
       
        if (arrayTablero[F+1][C] === null){
            continue
        }else{
            arrayTablero[F+1][posiciones] = 1
        }
       
    }
    if (arrayTablero[F][C-1] != null){
        arrayTablero[1][C-1] = 1
    }

    if (arrayTablero[F][C+1] != null){
        arrayTablero[1][C+1] = 1
    }
    
    

}

console.log(arrayTablero)
//console.log(contadorMinas)





