document.addEventListener('DOMContentLoaded', function() {
    // Función para buscar empresas asociadas al Rut ingresado
    function obtenerEmpresasAsociadas() {
        var rut = document.getElementById('rut').value;
        // URL del archivo CSV en tu repositorio de GitHub
        var csvUrl = 'https://raw.githubusercontent.com/PaulaaCoronado/Solicitud-mermas/main/Clientes.csv';

        // Realizar una solicitud HTTP GET al archivo CSV
        fetch(csvUrl)
            .then(response => response.text())
            .then(data => {
                // Procesar el contenido del archivo CSV
                var lineas = data.split('\n');
                var empresasAsociadas = [];

                // Buscar empresas asociadas al Rut especificado
                for (var i = 0; i < lineas.length; i++) {
                    var campos = lineas[i].split(',');
                    if (campos[0] === rut) {
                        empresasAsociadas.push(campos[1].trim()); // Agregar la empresa asociada al Rut a la lista
                    }
                }

                // Mostrar las empresas asociadas en el formulario como una lista desplegable
                var select = document.getElementById('empresasAsociadas');
                select.innerHTML = ''; // Limpiar opciones anteriores

                if (empresasAsociadas.length > 0) {
                    empresasAsociadas.forEach(function(empresa) {
                        var option = document.createElement('option');
                        option.text = empresa;
                        select.add(option);
                    });
                } else {
                    var option = document.createElement('option');
                    option.text = 'No se encontraron locales asociados';
                    select.add(option);
                }
            })
            .catch(error => {
                console.error('Error al cargar el archivo CSV:', error);
            });
    }

    function enviarFormulario() {
        var rut = document.getElementById('rut').value;
        var empresa = document.getElementById('empresasAsociadas').value; // Corregido el ID del campo empresa

        var url = 'https://script.google.com/u/0/home/projects/1wqAMNGz7CrCg_J5PMb8BiPJ9lGmuN9fpL4iGkzXTCXmPdiMC9AafJyfx/edit'; // URL del script de Google Apps Script actualizada
        var data = {
            rut: rut,
            empresa: empresa
        };

        fetch(url, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => console.log('Datos enviados correctamente'))
        .catch(error => console.error('Error al enviar datos', error));
    }

    // Agregar evento click al botón
    document.getElementById('buscarEmpresasBtn').addEventListener('click', obtenerEmpresasAsociadas);
    document.getElementById('enviarFormularioBtn').addEventListener('click', enviarFormulario);
});
