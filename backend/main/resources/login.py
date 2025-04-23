from flask_restful import Resource
from flask import request
from ..models.init import UsuarioModel
from .. import db

class Login(Resource):
    def get(self,id):
        usuario=db.session.query(UsuarioModel).get_or_404(id)
        return usuario.to_json()
