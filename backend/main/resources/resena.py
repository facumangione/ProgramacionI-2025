from flask_restful import Resource
from flask import request
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
        if int(id) in RESENAS:
            del RESENAS[int(id)]
            return 'Reseña eliminada con éxito', 204
        return 'El ID de la reseña a eliminar es inexistente', 404
    
    def put(self,id):
        if int(id) in RESENAS:
            resena=RESENAS[int(id)]
            data=request.get_json()
            resena.update(data)
            return 'Reseñas editado con exito',201
        return 'El id que intentan editar es inexistente',404

class Resenas(Resource):
    def get(self):
        return RESENAS

    def post(self):
        nueva_resena = request.get_json()
        id = int(max(RESENAS.keys())) + 1
        RESENAS[id] = nueva_resena
        return 'Reseña creada con éxito', 201