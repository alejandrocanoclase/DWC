class Tablero {
    // Filas y columnas del tablero
    filas;
    columnas;

    // Crea el tablero con un array bidemensional.
    constructor() {

        this.tamañoTablero();
        this.esParTablero();
        this.crearTablero();


    }

    // Pregunta al usuario cuantas dilas y columnas quiere.
    tamañoTablero() {
        this.filas = parseInt(prompt("¿Cuántas filas quieres en el tablero?"));
        this.columnas = parseInt(prompt("¿Cuántas columnas quieres en el tablero?"));
    }

    // Analiza si los valores introducidos para que el tablero sea par, en caso negativo pregunta de nuevo
    // hasta que se cumpla.
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

    // Crea un array bidimensional vacio del tamaño del tablero.
    crearTablero() {
        this.arrayTablero = [];

        for (let fila = 0; fila < this.filas; fila++) {
            this.arrayTablero[fila] = [];

            for (let columna = 0; columna < this.columnas; columna++) {
                this.arrayTablero[fila][columna] = '';
            }
        }
    }

    // Dibuja en pantalla el tablero mediante el DOM.
    dibujarTablero() {
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
}

class Memory extends Tablero {

    // Coloca los emoticonos en el array del tablero y luego lo dibuja en pantalla.
    constructor() {
        super();

        this.colocarEmoticonos();
        this.dibujarTablero();
        let celdaAnterior;
        let puntuacion;
        let duos;
        let intentos;
    }

    // Hace las parejas necesarias segun el tamño del tablero.
    hacerParejas() {
        let emoticonos = ["&#127514;", "&#127535;", "&#127538;", "&#127539;", "&#127540;",
            "&#127541;", "&#127542;", "&#127544;", "&#127490;", "&#127543;"];

        let tamanio = this.filas * this.columnas;
        let parejas = new Array(tamanio);
        let contador = 0;

        for (let i = 0; i < parejas.length; i++) {
            if (parejas[i] == null) {
                parejas[i] = emoticonos[contador];
                parejas[i + 1] = emoticonos[contador];
                contador++;
                if (contador >= emoticonos.length) {
                    contador = 0;
                }

            }

        }

        return parejas;
    }

    // Desordena el arrya de las parejas.
    desordenarArray(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    // Coloca en el array del tablero las parejas desordenadas.
    colocarEmoticonos(parejas) {
        parejas = this.hacerParejas();
        parejas = this.desordenarArray(parejas);


        let contador = 0;
        for (let filas = 0; filas < this.filas; filas++) {
            for (let columnas = 0; columnas < this.columnas; columnas++) {

                if (this.arrayTablero[filas][columnas] == '') {
                    this.arrayTablero[filas][columnas] = parejas[contador];
                    contador++;

                }
            }
        }
    }

    dibujarTablero() {

        this.puntuacion = 0;
        this.duos = 0;
        let titulo = document.createElement("h1");
        titulo.innerHTML = "Memorama";

        let puntuacion = document.createElement("p");
        puntuacion.id ="puntuacion";
        puntuacion.innerHTML = "Puntuación: " + this.puntuacion;

        document.body.appendChild(titulo);
        document.body.appendChild(puntuacion);

        super.dibujarTablero();

        let celda;
        this.voltear = this.voltear.bind(this);

        for (let i = 0; i < this.filas; i++) {
            for (let j = 0; j < this.columnas; j++) {

                // EVENTOS
                celda = document.getElementById("f" + i + "c" + j);
                celda.addEventListener('click', this.voltear);
            }
        }

        console.log(this.arrayTablero);
    }

    voltear(elEvento) {
        let evento = elEvento || window.event;
        let celda = evento.currentTarget;

        this.voltearCartas(celda);
    }

    voltearCartas(celda) {
        let filaCelda = celda.dataset.fila;
        let columnaCelda = celda.dataset.columna;
        

        celda.innerHTML = this.arrayTablero[filaCelda][columnaCelda];
        celda.style.backgroundColor = " grey ";
        
        let parrafoPuntuacion = document.getElementById("puntuacion");        

        if (this.celdaAnterior != null) {
            if (celda.innerHTML == this.celdaAnterior.innerHTML) {
                celda.style.backgroundColor = "green";
                this.celdaAnterior.style.backgroundColor = "green";

                celda.removeEventListener("click", this.voltear);
                this.celdaAnterior.removeEventListener("click", this.voltear);
                this.celdaAnterior = null;
                this.puntuacion+= 10;
                parrafoPuntuacion.innerHTML ="Puntuación: "+ this.puntuacion;
                this.duos ++;
                console.log(this.duos);
                this.ganar();

            } else {
                this.taparCartas(celda, this.celdaAnterior);
                this.celdaAnterior = null;

                this.intentos 

            }
        } else {
            this.celdaAnterior = celda;
        }

    }

    ganar(){

        let totalParejas = (this.filas * this.columnas)/2;

        if(this.duos == totalParejas){
            alert("Has ganado");
        }
    }

    puntuacion(intentos){
        
        switch (intentos){
            case intentos = 1:
                return 10;
            case intentos = 2:
                return 5;
            default:
                return 2.5;
        }

    }

    taparCartas(celda, celdaAnterior) {

        celda.style.backgroundColor = "red";
        celdaAnterior.style.backgroundColor = "red";
        setTimeout(function() {
            celda.style.backgroundColor = "white";
            celda.innerHTML = "";
            celdaAnterior.style.backgroundColor = "white";
            celdaAnterior.innerHTML = "";
        }, 500);

    }

}

window.onload = function () {
    let tableroMaster = new Memory();
}