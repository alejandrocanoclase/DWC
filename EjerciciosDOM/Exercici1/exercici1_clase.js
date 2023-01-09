
window.onload = function () {
    let contenedor = document.getElementById('info');
    let nodosLik = document.getElementsByTagName('a');
    let nodoP1 = document.createElement('p');
    noodP1.innerHTML = 'Número de enlaces de la página: ' + nodosLik.length;
    contenedor.appendChild(nodoP1);

    let nodosParrafos = document.getElementsByTagName('p');
    let parrafosDiv = contenedor.getElementsByTagName('p')
    let nodoP2 = document.createElement('p');
    nodoP2.innerHTML = `Número de párrafos: ${nodosParrafos.length}`;
    contenedor.appendChild(nodoP2);
}
