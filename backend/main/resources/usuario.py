from flask_restful import Resource
from flask import request, jsonify
from ..models.init import UsuarioModel
from .. import db

#USUARIOS={
#    1:{'nombre_apellido':'Pedro Gonzalez','DNI':'45956487','telefono':'2616754862','mail':'pedrogonzalez@gmail.com'},
#    2:{'nombre_apellido':'Martin Gutierrez','DNI':'42659715','telefono':'2616475123','mail':'martingutierrez@gmail.com'},
#    3:{'nombre_apellido':'Juan Ortiz','DNI':'44652178','telefono':'2617512648','mail':'juanortiz@gmail.com'}
#}

class Usuario(Resource):
    def get(self,id):
        usuario=db.session.query(UsuarioModel).get_or_404(id)
        return usuario.to_json()

    def delete(self,id):
        usuario=db.session.query(UsuarioModel).get_or_404(id)
        db.session.delete(usuario)
        db.session.commit()
        return usuario.to_json(), 204

    def put(self,id):
        usuario=db.session.query(UsuarioModel).get_or_404(id)
        data=request.get_json().items()
        for key,value in data:
            setattr(usuario,key,value)
        db.session.add(usuario)
        db.session.commit()
        return usuario.to_json(),201
    
class Usuarios(Resource):
    def get(self):
        usuarios=db.session.query(UsuarioModel).all()
        return jsonify([usuario.to_json() for usuario in usuarios])
    
    def post(self):
        new_usuario=UsuarioModel.from_json(request.get_json())
        db.session.add(new_usuario)
        db.session.commit()
        return new_usuario.to_json(),201