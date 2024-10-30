import os
from flask import Flask, render_template, request
from dotenv import load_dotenv
from fpdf import FPDF
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.application import MIMEApplication

load_dotenv()

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate-pdf', methods=['POST'])
def generate_pdf():
    name = request.form.get("name")
    
    # Crear el PDF con el nombre
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)
    pdf.cell(200, 10, txt="Documento de Términos y Condiciones", ln=True, align='C')
    pdf.cell(200, 10, txt=f"Nombre: {name}", ln=True, align='L')
    pdf.cell(200, 10, txt="Firma:", ln=True, align='L')
    pdf_file = "documento_firmado.pdf"
    pdf.output(pdf_file)

    # Enviar el PDF por correo
    send_email(pdf_file)
    return "PDF enviado por correo"

def send_email(pdf_file):
    user = os.getenv("EMAIL_USER")
    password = os.getenv("EMAIL_PASS")

    msg = MIMEMultipart()
    msg['From'] = user
    msg['To'] = "destinatario@gmail.com"
    msg['Subject'] = "Documento firmado"

    body = "Adjunto el documento firmado."
    msg.attach(MIMEText(body, 'plain'))

    with open(pdf_file, "rb") as attachment:
        part = MIMEApplication(attachment.read(), _subtype="pdf")
        part.add_header('Content-Disposition', 'attachment', filename=pdf_file)
        msg.attach(part)

    with smtplib.SMTP('smtp.gmail.com', 587) as server:
        server.starttls()
        server.login(user, password)
        server.sendmail(user, "destinatario@gmail.com", msg.as_string())

if __name__ == '__main__':
    app.run(debug=True)
