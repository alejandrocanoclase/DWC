class Tablero {
    constructor(filas, columnas) {
        this.filas = filas;
        this.columnas = columnas;

        this.crearTablero();
    }

    crearTablero() {
        // Crear array bidimensional para guardar las minas
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

    dibujarTableroDOM() {

        let tablero = document.createElement("table");
        document.body.appendChild(tablero);
        let fila;
        let columna;

        for (let i = 0; i < this.filas; i++) {
            fila = document.createElement("tr");
            tablero.appendChild(fila);

            for (let j = 0; j < this.columnas; j++) {
                columna = document.createElement("td");
                fila.appendChild(columna);

                columna.id = "f" + i + "c" + j;
                columna.dataset.fila = i;
                columna.dataset.columna = j;

            }
        }
    }



    modificarFilas(nuevasFilas) {
        // Modificar el número de filas y volver a crear el tablero con las filas nuevas
        this.filas = nuevasFilas;

        this.crearTablero();
    }

    modificarColumnas(nuevasColumnas) {
        // Modificar el número de columnas y volver a crear el tablero con las columnas nuevas
        this.columnas = nuevasColumnas;

        this.crearTablero();
    }


}

class Buscaminas extends Tablero {
    constructor(filas, columnas, numMinas) {
        super(filas, columnas);
        this.numMinas = numMinas;
        this.banderas = 0;

        this.colocarMinas();
        this.contarMinas();
    }

    colocarMinas() {
        let contadorMinas = 0;
        let posFila;
        let posColumna;


        while (contadorMinas < this.numMinas) {
            posFila = Math.floor(Math.random() * this.filas);
            posColumna = Math.floor(Math.random() * this.columnas);

            if (this.arrayTablero[posFila][posColumna] != 'MINA') {
                this.arrayTablero[posFila][posColumna] = 'MINA';
                contadorMinas++;
            };
        };
    }

    contarMinas() {
        let numMinasAlrededor;

        for (let fila = 0; fila < this.filas; fila++) {
            for (let columna = 0; columna < this.columnas; columna++) {
                numMinasAlrededor = 0;
                if (this.arrayTablero[fila][columna] != 'MINA') {
                    for (let cFila = fila - 1; cFila <= fila + 1; cFila++) {
                        if (cFila >= 0 && cFila < this.filas) {
                            for (let cColumna = columna - 1; cColumna <= columna + 1; cColumna++) {
                                if (cColumna >= 0 && cColumna < this.columnas &&
                                    this.arrayTablero[cFila][cColumna] == 'MINA') {
                                    numMinasAlrededor++;
                                }
                            }
                        }
                        this.arrayTablero[fila][columna] = numMinasAlrededor;
                    }

                }
            }
        }



    }


    dibujarTableroDOM() {
        super.dibujarTableroDOM();

        let celda;

        this.despejar = this.despejar.bind(this);
        this.marcar = this.marcar.bind(this);

        for (let i = 0; i < this.filas; i++) {
            for (let j = 0; j < this.columnas; j++) {

                // EVENTOS
                celda = document.getElementById("f" + i + "c" + j);

                celda.addEventListener('click', this.despejar);
                celda.addEventListener('contextmenu', this.marcar);

            }

        }

        console.log(this.arrayTablero);

    }

    despejar(elEvento) {
        let evento = elEvento || window.event;
        let celda = evento.currentTarget;

        this.despejarCelda(celda);

    }

    despejarCelda(celda) {
        let fila = parseInt(celda.dataset.fila);
        let columna = parseInt(celda.dataset.columna);
        
        celda.removeEventListener('click', this.despejar);
        celda.removeEventListener('contextmenu', this.marcar);
        celda.style.backgroundColor = "lightgrey";

        let contenido = this.arrayTablero[fila][columna];



        if (contenido > 0 && contenido < 9) {
            celda.innerHTML = contenido;
            
        } else if (contenido == 'MINA') {
            celda.innerHTML = contenido;

            let elemento;
            for (let i = 0; i < this.filas; i++) {
                for (let j = 0; j < this.columnas; j++) {
                    elemento = document.getElementById("f" + i + "c" + j);

                    if (elemento.innerHTML == "🚩" && this.arrayTablero[i][j] != 'MINA') {
                        elemento.style.backgroundColor = "pink";
                    }
                    if (this.arrayTablero[i][j] == 'MINA') {
                        elemento.innerHTML = this.arrayTablero[i][j];
                        elemento.style.backgroundColor = "orange";
                    }
                }
            }
            alert('perdiste por mamahuevo');
        } else if (contenido == 0) {
            //alert(celda.id + " " + this.filas);
            let elemento;
            celda.innerHTML = contenido;
            for (let i = fila - 1; i <= fila + 1; i++) {
                if (i >= 0 && i < this.filas) {
                    for (let j = columna - 1; j <= columna + 1; j++) {
                        if (j >= 0 && j < this.columnas) {
                            elemento = document.getElementById("f" + i + "c" + j);
                            console.log("f" + i + "c" + j);
                                if(elemento.innerHTML == ''){
                                    this.despejarCelda(elemento);
                                }
                            
                        }
                    }
                }
            }
        }
    }

    ganar(){
        
    }

    marcar(elEvento) {
        let evento = elEvento || window.event;
        let celda = evento.currentTarget;
        window.oncontextmenu = function () {
            return false;
        };

        switch (celda.innerHTML) {
            case celda.innerHTML = "":
                
                if (this.banderas != 5){
                    this.banderas ++;
                    celda.innerHTML = "🚩";
                }else{
                    celda.innerHTML = "❓";
                }
                
                break;
            case celda.innerHTML = "🚩":
                celda.innerHTML = "❓";
                this.banderas --;
                break;
            case celda.innerHTML = "❓":
                celda.innerHTML = "";
        }


    }

}
window.onload = function () {
    let buscaminas1 = new Buscaminas(5, 5, 5);
    buscaminas1.dibujarTableroDOM();
};