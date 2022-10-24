class Tablero{
    
    filas;
    columnas;

    constructor(){
        
        this.tamañoTablero();
        this.esParTablero();
        this.crearTablero();
        

    }


    tamañoTablero(){
        this.filas = parseInt(prompt("¿Cuántas filas quieres en el tablero?"));
        this.columnas = parseInt(prompt("¿Cuántas columnas quieres en el tablero?"));
    }

    esParTablero(){
        let par = false;
        while (par != true){
            if (this.filas * this.columnas % 2 != 0){
                alert("El tablero no es par con los valores que has introucido \n Por favor, cambialos.");
                this.tamañoTablero();
            }else{
                par = true;
            }
        }
        
    }

    crearTablero() {
        this.arrayTablero = [];

        for (let fila = 0; fila < this.filas; fila++) {
            this.arrayTablero[fila] = [];

            for (let columna = 0; columna < this.columnas; columna++) {
                this.arrayTablero[fila][columna] = '';
            }
        }
    }

    dibujarTablero() {
        // Creamos el tablero en html
        document.write('<table>');

        for (let i = 0; i < this.filas; i++) {
            document.write('<tr>');

            for (let j = 0; j < this.columnas; j++) {
                document.write(`<td>${this.arrayTablero[i][j]}</td>`);
                console.log(this.arrayTablero[i][j]);
            }

            document.write('</tr>');
        }
        document.write('</table>');
    }

}



