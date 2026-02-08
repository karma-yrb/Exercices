import http.server
import socketserver
import json
import os
from datetime import datetime

PORT = 58448
PROGRESS_FILE = ".github/context/PROGRESS.md"

class TrackerHandler(http.server.BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        data = json.loads(post_data)

        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()

        # Log des data reçues
        child = data.get('child', 'Anonyme')
        subject = data.get('subject', 'Inconnu')
        mission = data.get('mission', '?')
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M")

        print(f"✅ Reçu : {child} a fini {subject} - Mission {mission}")

        # Mise à jour du fichier de progression
        with open("reports_log.txt", "a", encoding="utf-8") as f:
            f.write(f"[{timestamp}] {child} | {subject} | Mission {mission} | Statut: Terminé\n")

    def log_message(self, format, *args):
        return # Silence log

print(f"📡 Serveur d'écoute parent actif sur le port {PORT}...")
print(f"👉 Votre IP locale est probablement : {[l for l in ([ip for res in [socket.gethostbyname_ex(socket.gethostname())[2]] for ip in res] + [socket.gethostbyname(socket.gethostname())]) if not l.startswith('127.')][:1][0]}")
with socketserver.TCPServer(("", PORT), TrackerHandler) as httpd:
    httpd.serve_forever()
