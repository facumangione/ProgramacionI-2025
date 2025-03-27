from flask import Flask
from dotenv import load_dotenv
from flask_restful import Api
import main.resources as resources

api=Api()

def create_app():
    app=Flask(__name__)
    load_dotenv()
    api.add_resource(resources.UsuarioResource,'/usuario/<id>')
    api.add_resource(resources.UsuariosResource,'/usuarios')
    api.init_app()
    return app

