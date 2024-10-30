const canvas = document.querySelector('.signature-canvas');
const ctx = canvas.getContext('2d');

// Establece las dimensiones del canvas original
canvas.width = 380; // Ancho igual al CSS
canvas.height = 50; // Alto igual al CSS

const modal = document.getElementById('signatureModal');
const modalCanvas = document.getElementById('modalCanvas');
const modalCtx = modalCanvas.getContext('2d');

// Establece las dimensiones del modal canvas
modalCanvas.width = window.innerWidth * 0.8; // 80% del ancho de la ventana
modalCanvas.height = 200; // Altura fija

let isDrawing = false;

// Abre el modal al hacer clic en el canvas principal
canvas.addEventListener('click', () => {
    modal.style.display = 'flex';
    modalCtx.clearRect(0, 0, modalCanvas.width, modalCanvas.height); // Limpia el canvas modal
});

// Inicia el dibujo en el canvas modal
modalCanvas.addEventListener('mousedown', () => {
    isDrawing = true;
    modalCtx.beginPath();
});

// Dibuja en el canvas modal
modalCanvas.addEventListener('mousemove', (event) => {
    if (isDrawing) {
        modalCtx.lineWidth = 2; // Grosor de la línea
        modalCtx.lineCap = 'round'; // Forma del extremo de la línea
        modalCtx.strokeStyle = 'blue'; // Color de la línea
        const rect = modalCanvas.getBoundingClientRect();
        const x = event.clientX - rect.left; // Ajusta la posición según el canvas
        const y = event.clientY - rect.top;
        modalCtx.lineTo(x, y);
        modalCtx.stroke();
        modalCtx.beginPath();
        modalCtx.moveTo(x, y);
    }
});

// Finaliza el dibujo en el canvas modal
modalCanvas.addEventListener('mouseup', () => {
    isDrawing = false;
    modalCtx.closePath();
    if (hasContent()) {
        canvas.style.animation = 'none'; // Detiene la animación
    }
});

// Detiene el dibujo si el mouse sale del canvas modal
modalCanvas.addEventListener('mouseleave', () => {
    isDrawing = false;
    modalCtx.closePath();
});

// Guardar firma en el canvas original
document.getElementById('saveSignature').addEventListener('click', () => {
    const modalImage = modalCanvas.toDataURL(); // Captura la imagen del canvas modal
    const img = new Image();
    img.src = modalImage;
    img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpia el canvas original
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height); // Ajusta la imagen al tamaño del canvas original

        // Detener el parpadeo si hay contenido en el canvas original
        if (hasContent()) {
            canvas.style.animation = 'none'; // Detiene la animación
        }
    };
    modal.style.display = 'none'; // Cierra el modal
});

// Cerrar modal
document.getElementById('closeModal').addEventListener('click', () => {
    modal.style.display = 'none'; // Cierra el modal
});

// Detectar el contenido del canvas
function hasContent() {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        if (data[i + 3] !== 0) { // Verifica si hay contenido (alpha > 0)
            return true;
        }
    }
    return false;
}

const nameInput = document.getElementById('nameInput');
const dateInput = document.getElementById('dateInput');

function stopBlinking(input) {
    input.style.animation = 'none'; // Detiene la animación
}

// Evento para detectar cambios en el input de texto
nameInput.addEventListener('input', () => {
    if (nameInput.value.trim() !== '') {
        stopBlinking(nameInput);
    }
});

// Evento para detectar cambios en el input de fecha
dateInput.addEventListener('input', () => {
    if (dateInput.value !== '') {
        stopBlinking(dateInput);
    }
});
