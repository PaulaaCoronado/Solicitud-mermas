document.addEventListener('DOMContentLoaded', function() {
    // Función para buscar empresas asociadas al Rut ingresado
    function obtenerEmpresasAsociadas() {
        var rut = document.getElementById('rut').value;
        // URL del archivo CSV en tu repositorio de GitHub
        var csvUrl = 'https://raw.githubusercontent.com/PaulaaCoronado/Solicitud-mermas/main/Clientes.csv?token=GHSAT0AAAAAACP5M4GERAQ4E4VTF264MDM6ZP4LYCA';

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
                        empresasAsociadas.push(campos[1]); // Agregar la empresa asociada al Rut a la lista
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
                    option.text = 'No se encontraron locales asociadoss';
                    select.add(option);
                }
            })
            .catch(error => {
                console.error('Error al cargar el archivo CSV:', error);
            });
    }

    // Agregar evento click al botón
    document.getElementById('buscarEmpresasBtn').addEventListener('click', obtenerEmpresasAsociadas);
});

