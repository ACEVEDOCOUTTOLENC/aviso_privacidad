// URL del archivo PDF que deseas mostrar
const url = 'static/terms.pdf';  // Ruta de tu archivo PDF

// Obtener el botón de cierre
const closeButton = document.getElementById('closeButton');

// Función para mostrar el PDF en el canvas
function renderPDF(url) {
    const modal = document.getElementById('documentModal');
    const pdfContainer = document.getElementById('pdf-container');

    // Cargar el PDF usando PDF.js
    pdfjsLib.getDocument(url).promise.then(function(pdf) {
        const totalPages = pdf.numPages; // Obtener el número total de páginas

        // Iterar a través de todas las páginas del documento
        for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
            pdf.getPage(pageNum).then(function(page) {
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');

                // Aumentar la escala para mejorar la resolución
                const scale = 2.5; // Aumentar el valor de la escala para mejorar la calidad
                const viewport = page.getViewport({ scale: scale });

                // Establecer las dimensiones del canvas para cada página
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                canvas.classList.add('pdf-page');

                // Renderizar la página en el canvas
                page.render({
                    canvasContext: context,
                    viewport: viewport
                });

                // Agregar el canvas con la página al contenedor
                pdfContainer.appendChild(canvas);
            });
        }
    });

    // Mostrar el modal con el PDF
    modal.classList.add('visible');
}

// Función para cerrar el modal
closeButton.addEventListener('click', function() {
    const modal = document.getElementById('documentModal');
    modal.classList.remove('visible');
});

// Llamar a la función para abrir el documento al cargar la página
window.onload = function() {
    renderPDF(url);
};
