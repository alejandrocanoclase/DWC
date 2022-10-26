class Tablero {

    filas;
    columnas;

    constructor() {

        this.tamañoTablero();
        this.esParTablero();
        this.crearTablero();


    }

    tamañoTablero() {
        this.filas = parseInt(prompt("¿Cuántas filas quieres en el tablero?"));
        this.columnas = parseInt(prompt("¿Cuántas columnas quieres en el tablero?"));
    }

    esParTablero() {
        let par = false;
        while (par != true) {
            if (this.filas * this.columnas % 2 != 0) {
                alert("El tablero no es par con los valores que has introucido \n Por favor, cambialos.");
                this.tamañoTablero();
            } else {
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
            }

            document.write('</tr>');
        }
        document.write('</table>');
    }

}

class Memory extends Tablero {

    constructor() {
        super();

        this.colocarEmoticonos();
        this.dibujarTablero();
    }

    colocarEmoticonos() {
        let emoticonos = ["&#127514;", "&#127535;", "&#127538;", "&#127539;", "&#127540;",
            "&#127541;", "&#127542;", "&#127544;", "&#127490;", "&#127543;"];
        let numAleatorio =0;
        let tamanio = this.filas * this.columnas;
        let parejas = new Array(tamanio);
        let contador = 0;
        
        for (let i = 0; i < parejas.length ; i++) {
            if(parejas[i] == null){
                parejas[i] = emoticonos[contador];
                parejas[i+1] = emoticonos[contador];
                contador++;
            }
            
        }


        parejas.sort(()=> Math.random() - 0.5)
        
        contador =0;
        for (let filas = 0; filas < this.filas; filas++) {
            for (let columnas = 0; columnas < this.columnas; columnas++) {
                numAleatorio = Math.floor(Math.random() * emoticonos.length);
                if (this.arrayTablero[filas][columnas] == ''){
                    this.arrayTablero[filas][columnas] = parejas[contador];
                    contador++;
                    
                }
            }
        }
        
    }
}

let tableroMaster = new Memory();


