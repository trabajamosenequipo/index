function calcular() {
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const edad = parseInt(document.getElementById("edad").value);
    const salario = parseFloat(document.getElementById("salario").value);
    const periodo = document.querySelector('input[name="periodo"]:checked').value;

    // Cálculo del ISSS
    let ISSS;
    if (salario < 1000) {
        ISSS = salario * 0.03; 
    } else {
        ISSS = 30; 
    }

    // Cálculo del AFP
    let AFP = salario * 0.0625;

    // Salario neto después de ISSS y AFP
    let salarioNeto = salario - ISSS - AFP;

    // Cálculo de la Renta
    let tramo = '';
    let exceso = 0;
    let porcentajeTR = 0;
    let cuotaFija = 0;

    if (salarioNeto <= 472) {
        tramo = 'Tramo 1';
    } else if (salarioNeto <= 895) {
        tramo = 'Tramo 2';
        exceso = 472;
        porcentajeTR = 0.1;
        cuotaFija = 17.6;
    } else if (salarioNeto <= 2038) {
        tramo = 'Tramo 3';
        exceso = 895;
        porcentajeTR = 0.2;
        cuotaFija = 60;
    } else {
        tramo = 'Tramo 4';
        exceso = 2038;
        porcentajeTR = 0.3;
        cuotaFija = 288;
    }

    let renta = (salarioNeto - exceso) * porcentajeTR + cuotaFija;

    // Cálculo del total de descuentos y salario final
    let totalDescuentos = ISSS + AFP + renta;
    let salarioFinal = salario - totalDescuentos;

    // Ajuste por periodo (mensual o quincenal)
    let salarioFinalPeriodo = periodo === "Quincenal" ? salarioFinal / 2 : salarioFinal;

    // Mostrar resultados
    document.getElementById("resultado").innerHTML = `
        <h3>Resultado</h3>
        <p>Nombre: ${nombre} ${apellido}</p>
        <p>Edad: ${edad}</p>
        <p>SALARIO: $${salario.toFixed(2)}</p>
        <p>Descuento AFP: $${AFP.toFixed(2)}</p>
        <p>Descuento ISSS: $${ISSS.toFixed(2)}
        <p>Descuento Renta: $${renta.toFixed(2)}</p>
        <p>Total descuentos: $${totalDescuentos.toFixed(2)}</p>
        <p>Salario ${periodo.toLowerCase()}: $${salarioFinalPeriodo.toFixed(2)}</p>
    `;
}
