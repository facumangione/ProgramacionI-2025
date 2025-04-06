from flask import Flask
from dotenv import load_dotenv
from flask_restful import Api
import main.resources as resources

api = Api()

def create_app():
    app = Flask(__name__)
    load_dotenv()

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

    #Login
    api.add_resource(resources.LoginResource, '/login')

    #Signin
    api.add_resource(resources.SigninResource, '/signin')

    #Notificaciones
    api.add_resource(resources.NotificacionResource, '/notificacion/<id>')
    api.add_resource(resources.NotificacionesResource, '/notificaciones')

    api.init_app(app)
    return app