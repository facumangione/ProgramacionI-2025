from flask_restful import Resource
from flask import request

PEDIDOS={
    1:{'id_usuario':'1','total':'12000','comidas':'hamburguesa','estado':'listo'},
    2:{'id_usuario':'3','total':'25000','comidas':'pizza','estado':'en preparacion'},
    3:{'id_usuario':'2','total':'10000','comidas':'fideos','estado':'entregado'}
}

class Pedido(Resource):
    def get(self,id):
        if int(id) in PEDIDOS:
            return PEDIDOS[int(id)]
        return 'El id es inexistente',404

    def delete(self,id):
        if int(id) in PEDIDOS:
            del PEDIDOS[int(id)]
            return 'Eliminado con exito',204
        return 'El id a eliminar es inexistente',404

    def put(self,id):
        if int(id) in PEDIDOS:
            pedido=PEDIDOS[int(id)]
            data=request.get_json()
            pedido.update(data)
            return 'Pedido editado con exito',201
        return 'El id que intentan editar es inexistente',404
    
class Pedidos(Resource):
    def get(self):
        return PEDIDOS
    
    def post(self):
        nuevo_pedido=request.get_json()
        id=int(max(PEDIDOS.keys()))+1
        PEDIDOS[id]=nuevo_pedido
        return 'Creado con exito',201