let maxFilas = prompt('¿Cuántas filas quieres?');
let maxColumnas = prompt('¿Cuántas columnas quieres?');
let numMinas = prompt('¿Cuántas minas quieres introducir?')


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

// Array bidimensional para guardar las minas

let arrayTablero = [];

for (let mina = 0; mina < numMinas; mina++){
    posFila= Math.floor(Math.random()*maxFilas);
    console.log(posFila)
    //arrayTablero[posFila][posColumna] = "MINA"
}




