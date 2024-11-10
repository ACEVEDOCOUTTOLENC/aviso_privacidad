// Obtiene el botón de cerrar y el modal
const closeButton = document.getElementById("closeButton");
const pdfModal = document.getElementById("pdfModal");

// Función para cerrar el modal
closeButton.onclick = function() {
    pdfModal.classList.remove("visible");
};

// Abre el modal automáticamente cuando se carga la página
window.onload = function() {
    pdfModal.classList.add("visible");
};
