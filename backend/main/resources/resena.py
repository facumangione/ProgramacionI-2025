from flask_restful import Resource
from flask import request,jsonify
from ..models.init import ResenaModel
from .. import db

RESENAS = {
    1: {'id_usuario': 1, 'id_comida': 2, 'calificacion': 5, 'comentario': 'Muy rica pizza!'},
    2: {'id_usuario': 3, 'id_comida': 1, 'calificacion': 4, 'comentario': 'Hamburguesa sabrosa pero pequeña.'}
}

class Resena(Resource):
    def get(self, id):
        resena=db.session.query(ResenaModel).get_or_404(id)
        return resena.to_json()

    def delete(self, id):
        resena=db.session.query(ResenaModel).get_or_404(id)
        db.session.delete(resena)
        db.session.commit()
        return resena.to_json(), 204
    
    def put(self,id):
        resena=db.session.query(ResenaModel).get_or_404(id)
        data=request.get_json().items()
        for key,value in data:
            setattr(resena,key,value)
        db.session.add(resena)
        db.session.commit()
        return resena.to_json(),201

class Resenas(Resource):
    def get(self):
        resenas=db.session.query(ResenaModel).all()
        return jsonify([resena.to_json() for resena in resenas])
    
    def post(self):
        new_resena=ResenaModel.from_json(request.get_json())
        db.session.add(new_resena)
        db.session.commit()
        return new_resena.to_json(),201