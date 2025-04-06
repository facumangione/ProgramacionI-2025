from flask_restful import Resource
from flask import request

NOTIFICACIONES={
    1:{'id_usuario':'1','mensaje':'Esta listo tu pedido'},
    2:{'id_usuario':'2','mensaje':'Pedido Cancelado'},
    3:{'id_usuario':'3','mensaje':'Modificacion de pedido'}
}

class Notificacion(Resource):
    def get(self,id):
        if int(id) in NOTIFICACIONES:
            return NOTIFICACIONES[int(id)]
        return 'El id es inexistente',404

    def delete(self,id):
        if int(id) in NOTIFICACIONES:
            del NOTIFICACIONES[int(id)]
            return 'Eliminado con exito',204
        return 'El id a eliminar es inexistente',404

    def put(self,id):
        if int(id) in NOTIFICACIONES:
            notificacion=NOTIFICACIONES[int(id)]
            data=request.get_json()
            notificacion.update(data)
            return 'Usuario editado con exito',201
        return 'El id que intentan editar es inexistente',404
    
class Notificaciones(Resource):
    def get(self):
        return NOTIFICACIONES
    
    def post(self):
        new_notificacion=request.get_json()
        id=int(max(NOTIFICACIONES.keys()))+1
        NOTIFICACIONES[id]=new_notificacion
        return 'Creado con exito',201