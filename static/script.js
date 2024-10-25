document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.getElementById('nameInput');
    const signatureCanvas = document.getElementById('signatureCanvas');
    const pdfIframe = document.getElementById('pdfIframe');
    const container = document.querySelector('.container');

    // Obtener las coordenadas del input y canvas
    const inputCoords = inputField.getBoundingClientRect();
    const canvasCoords = signatureCanvas.getBoundingClientRect();

    // Función para verificar visibilidad
    const checkVisibility = () => {
        const rect = pdfIframe.getBoundingClientRect();

        // Comprobar si el input está dentro del área visible
        if (
            inputCoords.top >= rect.top &&
            inputCoords.bottom <= rect.bottom &&
            inputCoords.left >= rect.left &&
            inputCoords.right <= rect.right
        ) {
            inputField.style.display = 'block';
        } else {
            inputField.style.display = 'none';
        }

        // Comprobar si el canvas está dentro del área visible
        if (
            canvasCoords.top >= rect.top &&
            canvasCoords.bottom <= rect.bottom &&
            canvasCoords.left >= rect.left &&
            canvasCoords.right <= rect.right
        ) {
            signatureCanvas.style.display = 'block';
        } else {
            signatureCanvas.style.display = 'none';
        }
    };

    // Comprobar visibilidad al hacer scroll
    container.addEventListener('scroll', checkVisibility);
    window.addEventListener('resize', checkVisibility);

    // Verificar la visibilidad inicialmente
    checkVisibility();
});
