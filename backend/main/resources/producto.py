from flask_restful import Resource
from flask import request

PRODUCTOS = {
    1: {'nombre': 'Coca Cola', 'cantidad': 50, 'precio': 1500},
    2: {'nombre': 'Papas Fritas', 'cantidad': 30, 'precio': 2000},
    3: {'nombre': 'Empanadas', 'cantidad': 100, 'precio': 1000}
}

class Producto(Resource):
    def get(self, id):
        if int(id) in PRODUCTOS:
            return PRODUCTOS[int(id)]
        return 'El ID del producto es inexistente', 404

    def delete(self, id):
        if int(id) in PRODUCTOS:
            del PRODUCTOS[int(id)]
            return 'Producto eliminado con éxito', 204
        return 'El ID del producto a eliminar es inexistente', 404

    def put(self, id):
        if int(id) in PRODUCTOS:
            producto = PRODUCTOS[int(id)]
            data = request.get_json()
            producto.update(data)
            return 'Producto editado con éxito', 201
        return 'El ID del producto que intentan editar es inexistente', 404

class Productos(Resource):
    def get(self):
        return PRODUCTOS

    def post(self):
        nuevo_producto = request.get_json()
        id = int(max(PRODUCTOS.keys(), default=0)) + 1
        PRODUCTOS[id] = nuevo_producto
        return 'Producto creado con éxito', 201
