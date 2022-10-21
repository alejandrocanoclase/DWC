class Tablero{
    
    constructor(filas,columnas){
        this.filas = filas;
        this.columnas = columnas;

        this.crearTablero();

    }

    

    crearTablero() {
        this.arrayTablero = [];
       


        for (let i = 0; i < this.filas; i++) {
            this.arrayTablero[i] = [];
            console.log("fila ", i);

            for (let j = 0; j < this.columnas; j++) {
                console.log("columna ", i);
                this.arrayTablero[i][j] = 'hola';
            }
        }

        for (let i = 0; i < this.filas; i++) {
            for (let j = 0; j < this.columnas; j++) {
                console.log(this.arrayTablero[i][j]);                
            }
        }

        
    }




    getFilas(){
        return this.filas;
    }

}
let tableroMaster = new Tablero(5,2);

