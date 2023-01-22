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

    // Revela el tablero durante 3seg para que se vean los emoticonos en el tablero.
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

    // Añade los eventos a las celdas además de actualizar el tiempo, la puntiación y el número de parejas.
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
                celda.addEventListener('contextmenu', this.voltear);
                celda.dataset.intentos = 0;
            }
        }

        let botonReiniciar = document.getElementById('reiniciar');
        
        this.reiniciarTablero = this.reiniciarTablero.bind(this);
        botonReiniciar.addEventListener("click", this.reiniciarTablero);

        this.cronometro();
        this.revelarTablero();

    }

    // Evento para reiniciar la partida.
    reiniciarTablero() {
        if (confirm("¿Deseas iniciar una partida nueva?")) {
           document.location="index.html";

        } else {
            alert('Puedes continuar');
        }
    }

    // Manejador del evento voltearCartas.
    voltear(elEvento) {
        let evento = elEvento || window.event;
        let celda = evento.currentTarget;

        this.voltearCartas(celda);
    }

    // Evento donde se revela el contenido de la celda, se compara si se ha hecho una pareja y se actualizan los marcadores.
    // También se aplican ciertos estilos con DOM según la situación.
    voltearCartas(celda) {
        let filaCelda = celda.dataset.fila;
        let columnaCelda = celda.dataset.columna;

        window.oncontextmenu = function () {
            return false;
        };

        celda.innerHTML = this.arrayTablero[filaCelda][columnaCelda];
        celda.style.backgroundColor = " grey ";

        let parrafoPuntuacion = document.getElementById("puntuacion");
        let parrafoParejas = document.getElementById("parejas");

        celda.removeEventListener("contextmenu", this.voltear);

        if (this.celdaAnterior != null) {
            if (celda.innerHTML == this.celdaAnterior.innerHTML) {
                celda.style.backgroundColor = "green";
                this.celdaAnterior.style.backgroundColor = "green";

                
                this.celdaAnterior.removeEventListener("contextmenu", this.voltear);
                this.puntos(celda);
                this.celdaAnterior = null;
                parrafoPuntuacion.innerHTML = "Puntuación: " + this.puntuacion + "/" + ((this.filas * this.columnas) / 2)*10;
                this.contadorParejas++;
                parrafoParejas.innerHTML = "Parejas: " + this.contadorParejas + "/" + (this.filas * this.columnas) / 2;
                console.log(this.contadorParejas);
            } else {
                celda.addEventListener("contextmenu", this.voltear);
                this.celdaAnterior.addEventListener("contextmenu", this.voltear);
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

    // Se implementa el sistema de puntos.
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

    // Cronómetro que cuenta los segundos y minutos que transcurren durante la partida.
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

    // Mensaje emergente al ganar la partida.
    ganar() {

        let totalParejas = (this.filas * this.columnas) / 2;
        let tiempo = document.getElementById('cronometro');

        if (this.contadorParejas == totalParejas) {
            clearInterval(this.tiempo);
            alert("¡Enhorabuena, has ganado! \n"+tiempo.innerHTML+ " segundos.\n"+"Conseguiste un total de: "+this.puntuacion+" puntos.");
        }
    }

    // En caso de error, se vuelven a tapar las cartas seleccionadas anteriormente
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