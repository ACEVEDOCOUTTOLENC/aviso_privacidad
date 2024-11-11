
const url = 'terms.pdf';
const closeButton = document.getElementById('closeButton');
function renderPDF(url) {
    const modal = document.getElementById('documentModal');
    const pdfContainer = document.getElementById('pdf-container');
    pdfjsLib.getDocument(url).promise.then(function (pdf) {
        const totalPages = pdf.numPages;
        for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
            pdf.getPage(pageNum).then(function (page) {
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                const scale = 1.5;
                const viewport = page.getViewport({ scale: scale });
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                canvas.classList.add('pdf-page');
                page.render({
                    canvasContext: context,
                    viewport: viewport
                });
                pdfContainer.appendChild(canvas);
            });
        }
    });
    modal.classList.add('visible');
}
closeButton.addEventListener('click', function () {
    const modal = document.getElementById('documentModal');
    modal.classList.remove('visible');
});
window.onload = function () {
    renderPDF(url);
};
