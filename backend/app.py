from flask import Flask
from flask_cors import CORS
from models import mysql
from routes.user_routes import bp as user_bp
from routes.absensi_routes import bp as absensi_bp
from routes.cuti_routes import bp as cuti_bp
from routes.departmen_routes import bp as departmen_bp
from routes.penilaian_kerja_routes import bp as penilaian_kerja_bp

app = Flask(__name__)
CORS(app)
app.config.from_object('config.Config')
mysql.init_app(app)

# Register Blueprints
app.register_blueprint(user_bp, url_prefix='/users')
app.register_blueprint(absensi_bp, url_prefix='/absensi')
app.register_blueprint(cuti_bp, url_prefix='/cuti')
app.register_blueprint(departmen_bp, url_prefix='/departmen')
app.register_blueprint(penilaian_kerja_bp, url_prefix='/penilaian_kerja')

if __name__ == '__main__':
    app.run(debug=True)
