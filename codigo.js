document.getElementById("btnPrincipalDos").addEventListener("click", function() {
    // Obtener los valores de los inputs
    const input1 = parseInt(document.getElementById("input1").value);
    const input2 = parseInt(document.getElementById("input2").value);
    const input3 = parseInt(document.getElementById("input3").value);
    const input4 = parseInt(document.getElementById("input4").value);
    const input5 = parseInt(document.getElementById("input5").value);
    const input6 = parseInt(document.getElementById("input6").value);
    const input7 = parseInt(document.getElementById("input7").value);

    // Verificar si los valores ingresados son correctos
    if (input1 === 9 && input2 === 9 && input3 === 9 && input4 === 9 && input5 === 1 && input6 === 0 && input7 === 0) {
        alert("¡Felicitaciones! Has resuelto el acertijo correctamente.");
        
        window.location.href = "inicio.html";
    } else {
        alert("Código incorrecto. Por favor, intenta de nuevo.");}
    }
);

