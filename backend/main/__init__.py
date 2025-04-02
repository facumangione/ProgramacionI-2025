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

    # Rutas de productos (stock)
    api.add_resource(resources.ProductoResource, '/producto/<id>')
    api.add_resource(resources.ProductosResource, '/productos')

    # Rutas de reseñas
    api.add_resource(resources.ReseñaResource, '/reseña/<id>')
    api.add_resource(resources.ReseñasResource, '/reseñas')

    api.init_app(app)
    return app