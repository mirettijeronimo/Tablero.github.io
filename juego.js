let nivelActual = 1;
let respuestaCorrecta = false;
let filaActual = 1;
let columnaActual = 1;
let vidas = 3;
let goombasPasados = 0;
let nivelGoomba;


// Función para preguntar si quiere guardar la partida
function preguntarGuardarPartida() {
  const respuesta = confirm("¿Quieres guardar la partida?");
  if (respuesta) {
    guardarPartida();
  }
}
// Función para manejar el evento de pasar por Goomba
function pasarPorGoomba(goomba) {
  switch (goomba.classList[0]) {
    case 'goomba1':
      window.location.href = './preguntas/preguntas.html';
      break;
    case 'goomba2':
      window.location.href = 'preguntas/pregunta2.html';
      break;
    case 'goomba3':
      window.location.href = 'preguntas/preguntas3.html';
      break;
    case 'goomba4':
      window.location.href = 'preguntas/preguntas4.html';
      break;
  }
}

function pasarPorPuerta() {
  window.location.href = "puerta.html";
}

window.onload = function () {
  const formulario = document.getElementById('formulario');
  if (formulario) {
    formulario.addEventListener('submit', verificarRespuesta);
  }
  cargarPosicion();
  actualizarPosicionMario();
  if (nivelActual > 1) {
    mostrarPreguntaActual();
  }
};

function cargarPosicion() {
  const filaGuardada = localStorage.getItem('filaActual');
  const columnaGuardada = localStorage.getItem('columnaActual');

  if (filaGuardada !== null && columnaGuardada !== null) {
    filaActual = parseInt(filaGuardada);
    columnaActual = parseInt(columnaGuardada);
  }
}

// Función para actualizar la posición de Mario en el tablero
function actualizarPosicionMario() {
  quitarMarioDeAnteriorPosicion();
  // Actualiza la celda actual de Mario
  const celdaActual = document.querySelector(`#tablero tr:nth-child(${filaActual}) td:nth-child(${columnaActual})`);
  if (celdaActual) {
    celdaActual.innerHTML = '<img src="imagenes/mario2.jpeg" class="mario-img">'; // Agregar la imagen de Mario
  }
}
// Función para mostrar la pregunta actual
function mostrarPreguntaActual() {
  if (goombasPasados === 0) {
    goombasPasados = 1;
    mostrarPregunta(1);
  } else if (goombasPasados === 2) {
    mostrarPregunta(2);
  } else if (goombasPasados === 3) {
    mostrarPregunta(3);
  } else if (goombasPasados === 4) {
    mostrarPregunta(4);
  }
}

function mostrarPregunta(nivel) {
  const preguntaActual = document.getElementById(`pregunta${nivel}`);
  preguntaActual.style.display = "block";
}



document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('formulario1').addEventListener('submit', verificarRespuesta1);
  document.getElementById('formulario2').addEventListener('submit', verificarRespuesta2);
  document.getElementById('formulario3').addEventListener('submit', verificarRespuesta3);
  document.getElementById('formulario4').addEventListener('submit', verificarRespuesta4);
});

// Funciones para verificar las respuestas
function verificarRespuesta1(event) {
  event.preventDefault();
  const respuesta = document.getElementById('respuesta1').value;
  if (respuesta === '10') {
    // Guardar la posición actual en localStorage
    guardarPosicion();
    // Redirigir a la página de inicio
    window.location.href = '../inicio.html';
    document.getElementById('pregunta1').style.display = 'none';
    document.getElementById('pregunta2').style.display = 'block';
  } else {
    vidas--;
    alert(`Respuesta incorrecta. Te quedan ${vidas} vidas.`);
    if (vidas === 0) {
      reiniciarJuego();
    }
  }
}

function verificarRespuesta2(event) {
  event.preventDefault();
  const respuesta = document.getElementById('respuesta2').value;
  if (respuesta === '12') {
     // Guardar la posición actual en localStorage
     guardarPosicion();
     // Redirigir a la página de inicio
     window.location.href = '../inicio.html';
     document.getElementById('pregunta1').style.display = 'none';
     document.getElementById('pregunta2').style.display = 'block';
  } else {
    vidas--;
    alert(`Respuesta incorrecta. Te quedan ${vidas} vidas.`);
    if (vidas === 0) {
      reiniciarJuego();
    }
  }
}

function verificarRespuesta3(event) {
  event.preventDefault();
  const respuesta = document.getElementById('respuesta3').value;
  if (respuesta === '80') {
    // Guardar la posición actual en localStorage
    guardarPosicion();
    // Redirigir a la página de inicio
    window.location.href = '../inicio.html';
    document.getElementById('pregunta3').style.display = 'none';
    document.getElementById('pregunta4').style.display = 'block';
  } else {
    vidas--;
    alert(`Respuesta incorrecta. Te quedan ${vidas} vidas.`);
    if (vidas === 0) {
      reiniciarJuego();
    }
  }
}

function verificarRespuesta4(event) {
  event.preventDefault();
  const respuesta = document.getElementById('respuesta4').value;
  if (respuesta === '63') {
    // Guardar la posición actual en localStorage
    guardarPosicion();
    // Redirigir a la página de inicio
    window.location.href = '../inicio.html';

  } else {
    vidas--;
    alert(`Respuesta incorrecta. Te quedan ${vidas} vidas.`);
    if (vidas === 0) {
      reiniciarJuego();
    }
  }
}



// Función para reiniciar el juego
function reiniciarJuego() {
  nivelActual = 1;
  vidas = 3;
  goombasPasados = 0;
  mostrarPreguntaActual(nivelGoomba);
}

// Agregar evento a los formularios
document.querySelectorAll("form").forEach((formulario) => {
  formulario.addEventListener("submit", verificarRespuesta);
});

// Agregar evento para cuando Mario pasa por un Goomba
document.addEventListener("goombaPasado", () => {
  goombasPasados++;
  mostrarPreguntaActual();
});
// Guardar la posición de Mario en localStorage
function guardarPosicion() {
  localStorage.setItem('filaActual', filaActual);
  localStorage.setItem('columnaActual', columnaActual);
}

// Movimiento de Mario
function moverMario() {

  // Si Mario está en la celda 20, moverlo a la 21
  if (filaActual === 2 && columnaActual === 10) {
    filaActual = 3;
    columnaActual = 1;
  }
  // Si Mario está en la celda 30, moverlo a la 31
  else if (filaActual === 3 && columnaActual === 10) {
    filaActual = 4;
    columnaActual = 1;
  }
  else {
    // Si Mario está en la primera fila, moverlo hacia la derecha
    if (filaActual === 1) {
      columnaActual++;
      if (columnaActual > 10) {
        filaActual++;
        columnaActual = 1;
      }
    }
    // Si Mario está en cualquier otra fila, moverlo hacia la derecha
    else {
      columnaActual++;
      if (columnaActual > 10) {
        columnaActual = 1;
      }
    }
  }
  // Verificación de monedas
  if (
    (filaActual === 1 && columnaActual === 7) || // moneda 1
    (filaActual === 3 && columnaActual === 7) || // moneda 2
    (filaActual === 4 && columnaActual === 8)    // moneda 3
  ) {
    preguntarGuardarPartida(); // Llamar a la función para preguntar si quiere guardar la partida
  }

  // Verificación de Goomba
  const goombas = {
    '2-6': 1, // Goomba en fila 2, columna 6 es el nivel 1
    '3-5': 2, // Goomba en fila 3, columna 5 es el nivel 2
    '4-4': 3, // Goomba en fila 4, columna 4 es el nivel 3
    '1-4': 4 // Goomba en fila 1, columna 4 es el nivel 4
  };
  if (
    (filaActual === 2 && columnaActual === 6) ||
    (filaActual === 3 && columnaActual === 5) ||
    (filaActual === 4 && columnaActual === 4) ||
    (filaActual === 1 && columnaActual === 4)
  ) {
    goombasPasados++;
    nivelGoomba = goombas[`${filaActual}-${columnaActual}`];
    nivelActual = nivelGoomba; // Actualizar nivelActual con el nivel del Goomba
    if (filaActual === 1 && columnaActual === 4) {
      const goomba = document.querySelector('.goomba1');
      pasarPorGoomba(goomba);
    } else if (filaActual === 2 && columnaActual === 6) {
      const goomba = document.querySelector('.goomba2');
      pasarPorGoomba(goomba);
    } else if (filaActual === 3 && columnaActual === 5) {
      const goomba = document.querySelector('.goomba3');
      pasarPorGoomba(goomba);
    } else if (filaActual === 4 && columnaActual === 4) {
      const goomba = document.querySelector('.goomba4');
      pasarPorGoomba(goomba);
    }
  }
  // Verificacion Puerta
  if (
    (filaActual === 3 && columnaActual === 6)
  ) {
    pasarPorPuerta()
  }

  // Manejo de respuesta correcta
  if (respuestaCorrecta) {
    filaActual = 1;
    columnaActual = 5;
    respuestaCorrecta = false;
  }

  // Verificar si Mario ha llegado al final del tablero
  if (filaActual === 4 && columnaActual === 10) {
    document.getElementById('avanzar').disabled = true;
    alert('¡Felicitaciones! Has ganado el juego.');
  }

  // Asegurarse de que Mario no salga del tablero
  filaActual = Math.max(1, Math.min(filaActual, 4));
  columnaActual = Math.max(1, Math.min(columnaActual, 10));
  // Actualizar posición de Mario en el tablero
  actualizarPosicionMario();
  // Luego de mover, guarda la nueva posición
  guardarPosicion();
}

// Quitar a Mario del casillero anterior
function quitarMarioDeAnteriorPosicion() {
  const celdas = document.querySelectorAll('#tablero td');
  celdas.forEach(celda => {
    celda.innerHTML = ''; // Limpiar el contenido de todas las celdas
  });
}

// Reestablecer el juego
function reiniciarJuego() {
  localStorage.removeItem('filaActual');
  localStorage.removeItem('columnaActual');
  filaActual = 1;
  columnaActual = 1;
  vidas = 3;

  actualizarPosicionMario();
  alert("¡Game over! Has perdido todas tus vidas. Reiniciando el juego...");
  window.location.href = 'inicio.html';
}

// Función para guardar la partida en JSON
function guardarPartida() {
  const partida = {
    nivelActual: nivelActual,
    filaActual: filaActual,
    columnaActual: columnaActual,
    vidas: vidas
  };
  localStorage.setItem("partida", JSON.stringify(partida));
  alert("Partida guardada con éxito");
} if (
  (filaActual === 1 && columnaActual === 7) ||
  (filaActual === 3 && columnaActual === 7)) {
  preguntarGuardarPartida(); // Llamada a la función
}


// Sección para manejo de formulario de nombre
document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.getElementById('formulario-nombre');
  const inputNombre = document.getElementById('nombre-jugador');
  const botonAvanzar = document.getElementById('avanzar');

  formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombreJugador = inputNombre.value;
    localStorage.setItem('nombreJugador', nombreJugador); // Guardar el nombre del jugador en localStorage
    alert("¡Bienvenido " + nombreJugador + ", Estás listo para jugar.");
    window.location.href = 'inicio.html'; // Redirigir a la página de inicio
    if (document.querySelector('.goomba1')) {
      const goomba = document.querySelector('.goomba1');
      pasarPorGoomba(goomba);
    }
  });

  if (botonAvanzar) {
    botonAvanzar.addEventListener('click', moverMario);
  } else {
    console.log("El botón 'avanzar' no existe");
  }
});


document.getElementById('avanzar').addEventListener('click', moverMario);