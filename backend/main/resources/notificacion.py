from flask_restful import Resource
from flask import request, jsonify
from ..models.init import NotificacionModel
from .. import db
from datetime import datetime

NOTIFICACIONES={
    1:{'id_usuario':'1','mensaje':'Esta listo tu pedido'},
    2:{'id_usuario':'2','mensaje':'Pedido Cancelado'},
    3:{'id_usuario':'3','mensaje':'Modificacion de pedido'}
}

class Notificacion(Resource):
    def get(self,id):
        notificacion=db.session.query(NotificacionModel).get_or_404(id)
        return notificacion.to_json()

    def delete(self,id):
        notificacion=db.session.query(NotificacionModel).get_or_404(id)
        db.session.delete(notificacion)
        db.session.commit()
        return notificacion.to_json(), 204

    def put(self,id):
        notificacion=db.session.query(NotificacionModel).get_or_404(id)
        data=request.get_json().items()
        for key,value in data:
            if key == 'fecha':
                value = datetime.strptime(value, "%d-%m-%Y %H:%M")
            setattr(notificacion,key,value)
        db.session.add(notificacion)
        db.session.commit()
        return notificacion.to_json(),201
    
class Notificaciones(Resource):
    def get(self):
        notificaciones=db.session.query(NotificacionModel).all()
        return jsonify([notificacion.to_json() for notificacion in notificaciones])
    
    def post(self):
        new_notificacion=NotificacionModel.from_json(request.get_json())
        db.session.add(new_notificacion)
        db.session.commit()
        return new_notificacion.to_json(),201