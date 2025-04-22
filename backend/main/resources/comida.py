from flask_restful import Resource
from flask import request
from ..models.init import ComidaModel
from .. import db

# Simulación de base de datos para comidas
COMIDAS = {
    1: {'nombre': 'Hamburguesa', 'descripcion': 'Doble carne con queso', 'precio': 5000},
    2: {'nombre': 'Pizza', 'descripcion': 'Muzzarella con aceitunas', 'precio': 8000},
    3: {'nombre': 'Fideos', 'descripcion': 'Con salsa bolognesa', 'precio': 4500}
}

class Comida(Resource):
    def get(self, id):
        comida=db.session.query(ComidaModel).get_or_404(id)
        return comida.to_json()

    def delete(self, id):
        """Eliminar una comida por ID"""
        if int(id) in COMIDAS:
            del COMIDAS[int(id)]
            return 'Comida eliminada con éxito', 204
        return 'El ID de la comida a eliminar es inexistente', 404

    def put(self, id):
        """Editar una comida por ID"""
        if int(id) in COMIDAS:
            comida = COMIDAS[int(id)]
            data = request.get_json()
            comida.update(data)
            return 'Comida editada con éxito', 201
        return 'El ID de la comida que intentan editar es inexistente', 404
    
class Comidas(Resource):
    def get(self):
        return COMIDAS
    
    def post(self):
        new_food=request.get_json()
        id=int(max(COMIDAS.keys()))+1
        COMIDAS[id]=new_food
        return 'Creado con exito',201