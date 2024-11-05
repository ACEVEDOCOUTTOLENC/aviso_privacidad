document.addEventListener('DOMContentLoaded', function () {
    const iframe = document.getElementById('pdfIframe');
    const modal = document.getElementById('privacyModal');

    // Función para abrir el modal
    function openModal() {
        modal.style.display = 'flex'; // Mostrar modal
    }

    // Función para verificar si se ha llegado al final del PDF
    function checkEndOfDocument() {
        const pdfWindow = iframe.contentWindow;

        if (pdfWindow) {
            // Comprueba si se ha alcanzado el final del PDF
            const scrollPosition = pdfWindow.scrollY + pdfWindow.innerHeight;
            const documentHeight = pdfWindow.document.body.scrollHeight;

            // Solo abre el modal si se ha llegado al final
            if (scrollPosition >= documentHeight) {
                openModal();
                // Eliminar el evento de desplazamiento para que no se abra varias veces
                pdfWindow.removeEventListener('scroll', checkEndOfDocument);
            }
        }
    }

    // Cuando el iframe se carga
    iframe.addEventListener('load', function () {
        // Agregar el listener para el evento de scroll en el iframe
        const pdfWindow = iframe.contentWindow;
        pdfWindow.addEventListener('scroll', checkEndOfDocument);
    });

    // Cerrar el modal
    document.getElementById('modalCloseButton').addEventListener('click', function () {
        modal.style.display = 'none'; // Oculta el modal
    });

    // Manejo del botón de aceptar
    document.getElementById('modalAcceptButton').addEventListener('click', function () {
        const name = document.getElementById('modalNameInput').value;
        console.log("Nombre:", name); // Para depuración
        modal.style.display = 'none'; // Cierra el modal
    });
});
