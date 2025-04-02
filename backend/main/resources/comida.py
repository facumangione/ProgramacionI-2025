from flask_restful import Resource
from flask import request

# Simulación de base de datos para comidas
COMIDAS = {
    1: {'nombre': 'Hamburguesa', 'descripcion': 'Doble carne con queso', 'precio': 5000},
    2: {'nombre': 'Pizza', 'descripcion': 'Muzzarella con aceitunas', 'precio': 8000},
    3: {'nombre': 'Fideos', 'descripcion': 'Con salsa bolognesa', 'precio': 4500}
}

class ComidaResource(Resource):
    def get(self, id):
        """Obtener una comida por ID"""
        if int(id) in COMIDAS:
            return COMIDAS[int(id)]
        return 'El ID de la comida es inexistente', 404

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