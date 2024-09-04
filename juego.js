const estadoJuego = {
  puntos: 0,
  vidas: 3,
  respuestasCorrectas: 0,
  giros: 0,
  nombreJugador: '',
  preguntas: [
    { id: 0, pregunta: "¿Cuál es el resultado de: -2 · 3 : (-6)=..?", respuesta: 1 },
    { id: 1, pregunta: "¿Cuántas vidas tiene Mario al principio del juego?", respuesta: 3 },
    { id: 2, pregunta: "El mínimo común múltiplo de 20 y 30 es...", respuesta: 60 },
    { id: 3, pregunta: "Vamos a resolver esta suma 5 + 5 = ?", respuesta: 10 },
    { id: 4, pregunta: "¿Cuánto es el resultado de 60 + 20?", respuesta: 80 },
    { id: 5, pregunta: "¿Cual es el resultado de 12 x 2?", respuesta: 24 }
  ]
};

const girarBtn = document.querySelector('#girar');
const resultado = document.querySelector('#resultado');
const flecha = document.querySelector('.flecha');
const puntosElement = document.querySelector('#puntos');
const vidasElement = document.querySelector('#vidas');
const pregunta = document.querySelector('#pregunta-display');
const contenedorResponder = document.querySelector('#contenedor-responder');

document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.getElementById('formulario-nombre');

  if (formulario) {
    formulario.addEventListener('submit', (e) => {
      e.preventDefault();
      const inputNombre = document.getElementById('nombre-jugador');
      const nombreJugador = inputNombre.value.trim();

      if (nombreJugador === "") {
        alert("Por favor, ingresa un nombre válido");
      } else {
        fetch('https://jsonplaceholder.typicode.com/todos/1')
          .then(response => response.json())
          .then(data => {
            const datosJuego = {
              nombreJugador: nombreJugador,
              puntos: 0,
              vidas: 3,
              respuestasCorrectas: 0,
              giros: 0,
              data: data
            };
            localStorage.setItem('datosJuego', JSON.stringify(datosJuego));
            window.location.href = 'inicio.html';
          })
          .catch(error => console.error('Error:', error));
      }
    });
  }
  const girarBtn = document.querySelector('#girar');
  if (girarBtn) {
    girarBtn.addEventListener('click', girar);
  } else {
    console.log("El botón 'Girar' no existe");
  }

  fetch('../datos.json')
    .then(response => response.json())
    .then(data => {
      estadoJuego.nombreJugador = data.nombre;
      estadoJuego.puntos = data.puntos;

    })
    .catch(error => console.error('Error:', error));
});

function girar() {
  console.log("Se ha iniciado el juego");
  let rand = Math.floor(Math.random() * 20 * 360); 
  calcular(rand);
}


function evaluarRespuesta(respuesta, preguntaIndex) {
  const preguntaActual = estadoJuego.preguntas[preguntaIndex];
  const respuestaNumerica = parseInt(respuesta);
  if (respuestaNumerica === preguntaActual.respuesta) {
    estadoJuego.puntos++;
    estadoJuego.respuestasCorrectas++;
    puntosElement.textContent = `Puntos: ${estadoJuego.puntos}`;
  } else {
    estadoJuego.vidas--;
    vidasElement.textContent = `Vidas: ${estadoJuego.vidas}`;
  }
  girar();
}

function guardarPartida() {
  const estadoPartida = {
    puntos: estadoJuego.puntos,
    vidas: estadoJuego.vidas,
    respuestasCorrectas: estadoJuego.respuestasCorrectas,
    giros: estadoJuego.giros,
    nombreJugador: localStorage.getItem('nombreJugador')
  };
  localStorage.setItem('estadoPartida', JSON.stringify(estadoPartida));
}

function cargarPartida() {
  const estadoPartida = JSON.parse(localStorage.getItem('estadoPartida'));
  if (estadoPartida) {
    estadoJuego.puntos = estadoPartida.puntos;
    estadoJuego.vidas = estadoPartida.vidas;
    estadoJuego.respuestasCorrectas = estadoPartida.respuestasCorrectas;
    estadoJuego.giros = estadoPartida.giros;
    puntosElement.textContent = `Puntos: ${estadoJuego.puntos}`;
    vidasElement.textContent = `Vidas: ${estadoJuego.vidas}`;
  }
}
function mostrarPregunta(pregunta) {
  const preguntaDisplay = document.querySelector('#pregunta-display');
  if (preguntaDisplay) {
    preguntaDisplay.style.display = "block";
    preguntaDisplay.style.visibility = "visible";
    preguntaDisplay.innerHTML = ''; 
    const textoPregunta = document.createTextNode(pregunta.pregunta);
    preguntaDisplay.appendChild(textoPregunta);
    console.log("Texto agregado:", textoPregunta);
  } else {
    console.log("El elemento con id 'pregunta-display' no existe");
  }
}
function calcular(rand) {
  console.log("Llamando a la función calcular");
  let valor = rand / 360;
  valor = (valor - parseInt(valor.toString().split(".")[0])) * 360;
  document.querySelector('.ruleta-inner').style.transform = "rotate(" + rand + "deg)";

  let preguntaIndex = 0;

  if (valor > 0 && valor <= 60) {
    preguntaIndex = 0;
  } else if (valor > 60 && valor <= 120) {
    preguntaIndex = 1;
  } else if (valor > 120 && valor <= 180) {
    preguntaIndex = 2;
  } else if (valor > 180 && valor <= 240) {
    preguntaIndex = 3;
  } else if (valor > 240 && valor <= 300) {
    preguntaIndex = 4;
  } else if (valor > 300 && valor <= 360) {
    preguntaIndex = 5;
  }

  mostrarPregunta(estadoJuego.preguntas[preguntaIndex]);
  const responderBtn = document.createElement('button');
  responderBtn.textContent = 'Responder';
  contenedorResponder.innerHTML = ''; 
  contenedorResponder.appendChild(responderBtn);

  responderBtn.addEventListener('click', function () {

    const inputRespuesta = document.createElement('input');
    inputRespuesta.type = 'number';
    inputRespuesta.id = 'respuesta';
    contenedorResponder.appendChild(inputRespuesta);

    const botonEnviar = document.createElement('button');
    botonEnviar.textContent = 'Enviar';
    contenedorResponder.appendChild(botonEnviar);

    botonEnviar.addEventListener('click', function () {
      const respuesta = inputRespuesta.value;
      evaluarRespuesta(respuesta, preguntaIndex);
      if (estadoJuego.vidas === 0) {
        alert("¡Juego terminado! Has perdido. ¿Quieres reiniciar?");
        const reiniciar = confirm("¿Quieres reiniciar?");
        if (reiniciar) {
          reiniciarJuego();
        } else {
          window.location.href = 'index.html';
        }
      } else if (estadoJuego.puntos === 5) {
        alert("¡Felicidades! Has ganado el juego. ¿Quieres reiniciar?");
        const reiniciar = confirm("¿Quieres reiniciar?");
        if (reiniciar) {
          reiniciarJuego();
        } else {
          window.location.href = 'index.html';
        }
      } else if (estadoJuego.puntos === 3) {
        const guardarPartida = confirm("¿Quieres guardar la partida?");
        if (guardarPartida) {
          guardarPartidaLocalStorage();
        }
      }
    });
  });
}


function guardarPartidaLocalStorage() {
  const partidaGuardada = {
    puntos: estadoJuego.puntos,
    vidas: estadoJuego.vidas,
    respuestasCorrectas: estadoJuego.respuestasCorrectas
  };
  localStorage.setItem('partidaGuardada', JSON.stringify(partidaGuardada));
  Swal.fire("Partida guardada correctamente");
}


function reiniciarJuego() {
  estadoJuego.puntos = 0;
  estadoJuego.vidas = 3;
  estadoJuego.respuestasCorrectas = 0;
  puntosElement.textContent = `Puntos: ${estadoJuego.puntos}`;
  vidasElement.textContent = `Vidas: ${estadoJuego.vidas}`;
  girarBtn.disabled = false;
}