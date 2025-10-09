from flask import Flask
from dotenv import load_dotenv
from flask_restful import Api
import os
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_mail import Mail
from flask_cors import CORS

api = Api()

db=SQLAlchemy()

migrate=Migrate()

jwt=JWTManager()

mailsender=Mail()

def create_app():
    app = Flask(__name__)
    load_dotenv()

    CORS(app)

    # Crear Base de Datos
    if not os.path.exists(os.getenv('DATABASE_PATH')+os.getenv('DATABASE_NAME')):
        os.mknod(os.getenv('DATABASE_PATH')+os.getenv('DATABASE_NAME'))

    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////'+os.getenv('DATABASE_PATH')+os.getenv('DATABASE_NAME')
    db.init_app(app)
    
    import main.resources as resources

    # Rutas de usuarios
    api.add_resource(resources.UsuarioResource, '/usuario/<id>')
    api.add_resource(resources.UsuariosResource, '/usuarios')

    # Rutas de pedidos
    api.add_resource(resources.PedidoResource, '/pedido/<id>')
    api.add_resource(resources.PedidosResource, '/pedidos')

    # Rutas de comida
    api.add_resource(resources.ComidaResource, '/comida/<id>')
    api.add_resource(resources.ComidasResource, '/comidas')

    # Rutas de reseñas
    api.add_resource(resources.ResenaResource, '/resena/<id>')
    api.add_resource(resources.ResenasResource, '/resenas')

    #Notificaciones
    api.add_resource(resources.NotificacionResource, '/notificacion/<id>')
    api.add_resource(resources.NotificacionesResource, '/notificaciones')

    #Añadir comida a pedido
    api.add_resource(resources.Añadir_carritoResource, '/anadircarrito')

    api.init_app(app)

    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = int(os.getenv('JWT_ACCESS_TOKEN_EXPIRES'))
    jwt.init_app(app)

    from main.auth import routes
    app.register_blueprint(routes.auth)

    app.config['MAIL_HOSTNAME'] = os.getenv('MAIL_HOSTNAME')
    app.config['MAIL_SERVER'] = os.getenv('MAIL_SERVER')
    app.config['MAIL_PORT'] = os.getenv('MAIL_PORT')
    app.config['MAIL_USE_TLS'] = os.getenv('MAIL_USE_TLS')
    app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
    app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
    app.config['FLASKY_MAIL_SENDER'] = os.getenv('FLASKY_MAIL_SENDER')
    
    mailsender.init_app(app)

    return app