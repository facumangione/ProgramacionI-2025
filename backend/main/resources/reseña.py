from flask_restful import Resource
from flask import request

RESEÑAS = {
    1: {'id_usuario': 1, 'id_comida': 2, 'calificacion': 5, 'comentario': 'Muy rica pizza!'},
    2: {'id_usuario': 3, 'id_comida': 1, 'calificacion': 4, 'comentario': 'Hamburguesa sabrosa pero pequeña.'}
}

class Reseña(Resource):
    def get(self, id):
        if int(id) in RESEÑAS:
            return RESEÑAS[int(id)]
        return 'El ID de la reseña es inexistente', 404

    def delete(self, id):
        if int(id) in RESEÑAS:
            del RESEÑAS[int(id)]
            return 'Reseña eliminada con éxito', 204
        return 'El ID de la reseña a eliminar es inexistente', 404

class Reseñas(Resource):
    def get(self):
        return RESEÑAS

    def post(self):
        nueva_reseña = request.get_json()
        id = int(max(RESEÑAS.keys(), default=0)) + 1
        RESEÑAS[id] = nueva_reseña
        return 'Reseña creada con éxito', 201
