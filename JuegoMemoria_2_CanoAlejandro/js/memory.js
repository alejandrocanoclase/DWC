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
        tablero.id = "tablero";
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
        let contadorParejas;
        let tiempo;
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

    revelarTablero(){
        let celda;
        

        for (let i = 0; i < this.filas; i++) {
            for (let j = 0; j < this.columnas; j++) {
                celda = document.getElementById("f" + i + "c" + j);
                celda.innerHTML = this.arrayTablero[i][j];
            }
            
        }

        let esconder = setTimeout(() =>{
            for (let i = 0; i < this.filas; i++) {
                for (let j = 0; j < this.columnas; j++) {
                    celda = document.getElementById("f" + i + "c" + j);
                    celda.innerHTML = "";
                }
            }
        },3000);

    }

    dibujarTablero() {

        this.puntuacion = 0;
        this.contadorParejas = 0;
        super.dibujarTablero();

        let parrafoPuntuacion = document.getElementById("puntuacion");
        parrafoPuntuacion.innerHTML = "Puntuación: 0/" +((this.filas * this.columnas) / 2)*10;
        let parrafoParejas = document.getElementById("parejas");
        parrafoParejas.innerHTML = "Parejas: 0" + "/" + (this.filas * this.columnas) / 2;

        let celda;
        this.voltear = this.voltear.bind(this);

        for (let i = 0; i < this.filas; i++) {
            for (let j = 0; j < this.columnas; j++) {

                // EVENTOS
                celda = document.getElementById("f" + i + "c" + j);
                celda.addEventListener('click', this.voltear);
                celda.dataset.intentos = 0;
            }
        }

        let botonReiniciar = document.getElementById('reiniciar');
        
        this.reiniciarTablero = this.reiniciarTablero.bind(this);
        botonReiniciar.addEventListener("click", this.reiniciarTablero);

        this.cronometro();
        this.revelarTablero();
        

        console.log(this.arrayTablero);
    }


    reiniciarTablero() {
        if (confirm("¿Deseas iniciar una partida nueva?")) {
           document.location="index.html";

        } else {
            alert('Puedes continuar');
        }
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
        let parrafoParejas = document.getElementById("parejas");

        if (this.celdaAnterior != null) {
            if (celda.innerHTML == this.celdaAnterior.innerHTML) {
                celda.style.backgroundColor = "green";
                this.celdaAnterior.style.backgroundColor = "green";

                celda.removeEventListener("click", this.voltear);
                this.celdaAnterior.removeEventListener("click", this.voltear);
                this.puntos(celda);
                this.celdaAnterior = null;
                parrafoPuntuacion.innerHTML = "Puntuación: " + this.puntuacion + "/" + ((this.filas * this.columnas) / 2)*10;
                this.contadorParejas++;
                parrafoParejas.innerHTML = "Parejas: " + this.contadorParejas + "/" + (this.filas * this.columnas) / 2;
                console.log(this.contadorParejas);
            } else {
                this.taparCartas(celda, this.celdaAnterior);
                celda.dataset.intentos = parseInt(celda.dataset.intentos) + 1;
                this.celdaAnterior.dataset.intentos = parseInt(this.celdaAnterior.dataset.intentos) + 1;
                this.celdaAnterior = null;
            }
        } else {
            this.celdaAnterior = celda;
        }
        this.ganar();

    }

    puntos(casilla) {

        let intentosCasilla = parseInt(casilla.dataset.intentos);
        let intentosCeldaAnterior = parseInt(this.celdaAnterior.dataset.intentos);

        if(intentosCasilla > intentosCeldaAnterior){
            switch (intentosCasilla){
                case 0:
                    this.puntuacion +=10;
                    break;
                case 1:
                    this.puntuacion +=5;
                    break;
                case 2:
                    this.puntuacion +=2,5;
                    break;
                default:
                    this.puntuacion +=0;
            }
        }else{
            switch (intentosCeldaAnterior){
                case 0:
                    this.puntuacion +=10;
                    break;
                case 1:
                    this.puntuacion +=5;
                    break;
                case 2:
                    this.puntuacion +=2,5;
                    break;
                default:
                    this.puntuacion +=0;
        }
    }
        

    }


    cronometro(){

        let cronometro = document.getElementById('cronometro');
        let segundos = 0;
        let minutos = 0;
        let cadenaSegundos = "";

        this.tiempo = setInterval(function(){
            segundos ++;
            if(segundos > 59){
                segundos = 0;
                minutos ++;
            }

            if(segundos < 10){
                cadenaSegundos = "0"+segundos;
            }else{
                cadenaSegundos = segundos;
            }
            cronometro.innerHTML ="Tiempo: "+minutos+":"+cadenaSegundos;
            this.tiempo = cronometro.innerHTML;
            },1000);
    }

    ganar() {

        let totalParejas = (this.filas * this.columnas) / 2;
        let tiempo = document.getElementById('cronometro');

        if (this.contadorParejas == totalParejas) {
            clearInterval(this.tiempo);
            alert("¡Enhorabuena, has ganado! \n"+tiempo.innerHTML+ " segundos.\n"+"Conseguiste un total de: "+this.puntuacion+" puntos.");
        }
    }




    taparCartas(celda, celdaAnterior) {

        celda.style.backgroundColor = "red";
        celdaAnterior.style.backgroundColor = "red";
        setTimeout(function () {
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