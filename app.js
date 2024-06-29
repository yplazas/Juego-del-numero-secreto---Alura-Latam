//Variables
let numeroSecreto = 0;
let numeroSecretoMax = 10;
let listaNumerosSecretos = [];
let intentos = 0;
let palabraVeces = "";
let maxIntentos = 0;

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
}

function asignarTextoElementoId(id, texto) {
    let elementoHTML = document.getElementById(id);
    elementoHTML.innerHTML = texto;
}

function verificarIntento() {

    let numeroUsuario = parseInt(document.getElementById("valorUsuario").value);

    //validamos si el numeroUsuario viene vacia
    if (isNaN(numeroUsuario)) {
        asignarTextoElemento("p", `por favor digita un numero`);

        //validamos si el numero ingresado es mayor al rango del juego  
    } else if (numeroUsuario <= 0) {
        asignarTextoElemento("p", `no puede digitar 0 o un numero negativo`);

    } else if (numeroUsuario > numeroSecretoMax) {
        limpiarCaja();
        asignarTextoElemento("p", `el numero ${numeroUsuario} que ingresaste no esta dentro del rango del juego`);

        //validamos si el numero ingresado es igual al numero secreto
    } else if (numeroUsuario === numeroSecreto) {
        asignarTextoElemento("p", `Acertaste, Lo hiciste en ${intentos} ${intentos == 1 ? "vez" : "veces"}`);
        //deshabilitamos el boton de intentar
        document.getElementById("intentar").setAttribute("disabled", true);
        // habilitamos el boton de nuevo juego
        document.getElementById("reiniciar").removeAttribute("disabled");
    } else {

        //Limpiamos la caja de texto
        limpiarCaja();

        //condicional ternario para darle pistas al usuario
        numeroUsuario > numeroSecreto ? asignarTextoElemento("p", "El número secreto es menor") : asignarTextoElemento("p", "El número secreto es mayor");

        //Incrementamos los intentos cuando no se acierta
        intentos++;
        asignarTextoElementoId("intento", ` ${intentos}`);
        palabraVeces = "veces";

        //condicional para evaluar el numero maximo de intentos
        if (intentos > maxIntentos) {
            asignarTextoElemento("p", `llegaste al numero maximo de ${maxIntentos} intentos, el numero secreto era ${numeroSecreto}`);
            //deshabilitamos el boton de intentar
            document.getElementById("intentar").setAttribute("disabled", true);
            //habilitamos el boton de nuevo juego
            document.getElementById("reiniciar").removeAttribute("disabled");
            //establecemos los intentos en 3
            asignarTextoElementoId("intento", ` ${intentos = 3}`);
        }
    }
}

function limpiarCaja() {
    let valorCaja = document.querySelector("#valorUsuario");
    valorCaja.value = "";
}

function reiniciarJuego() {
    //habilitamos el boton de intentar
    document.getElementById("intentar").removeAttribute("disabled");
    //deshabilitamos el boton de nuevo juego
    document.getElementById("reiniciar").setAttribute("disabled", true);
    //Limpiamos la caja de texto
    limpiarCaja();
    //establecemos las condiciones iniciales
    condicionesIniciales();
}

function generarNumeroSecreto() {
    //generamos un numero aleatorio entre 1 y n numero maximo
    let numeroGenerado = Math.floor(Math.random() * numeroSecretoMax) + 1;

    if (listaNumerosSecretos.includes(numeroGenerado)) {
        return generarNumeroSecreto();
    } else {
        listaNumerosSecretos.push(numeroGenerado);
        return numeroGenerado;
    }
}

function condicionesIniciales() {
    asignarTextoElemento("h1", "Juego del numero secreto");
    asignarTextoElemento("p", `Indica un numero del 1 al ${numeroSecretoMax}`);

    //validamos si ya todos los numeros dentro del rango del juego fueron sorteados
    if (listaNumerosSecretos.length === numeroSecretoMax) {
        asignarTextoElemento("p", `ya se sortearon todos los numeros posibles dentro del rango de ${numeroSecretoMax} numeros`);
        //deshabilitamos el juego
        deshabilitarJuego();
    } else {
        //generamos el numero secreto e inicializamos los intentos.
        numeroSecreto = generarNumeroSecreto();
        intentos = 1;
        palabraVeces = "vez";
        maxIntentos = 3;

        // establecemos los valores inciales de los intentos en la vista del usuario
        asignarTextoElementoId("intento", ` ${intentos}`);
        asignarTextoElementoId("maxIntentos", ` ${maxIntentos}`);

    }
}

function deshabilitarJuego() {
    document.getElementById("intentar").setAttribute("disabled", true);
    document.getElementById("reiniciar").setAttribute("disabled", true);
}

condicionesIniciales();
