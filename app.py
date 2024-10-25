from flask import Flask, render_template, send_from_directory
import os

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/pdf/<path:filename>')
def send_pdf(filename):
    return send_from_directory('templates', filename)

if __name__ == '__main__':
    app.run(debug=True)
