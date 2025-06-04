from flask_restful import Resource
from flask import request, jsonify
from ..models.init import NotificacionModel
from .. import db
from datetime import datetime
from flask_jwt_extended import jwt_required,get_jwt_identity,get_jwt
from main.auth.decorators import role_required

class Notificacion(Resource):
    
    @role_required(roles=["ADMIN",'CLIENTE'])
    def get(self,id):
        notificacion=db.session.query(NotificacionModel).get_or_404(id)
        rol=get_jwt().get('rol')
        if rol=='CLIENTE' and notificacion.id_usuario!=get_jwt_identity():
            return 'No tiene permiso para ver esta notificacion',403
        return notificacion.to_json()

    @role_required(roles=["ADMIN"])
    def delete(self,id):
        notificacion=db.session.query(NotificacionModel).get_or_404(id)
        db.session.delete(notificacion)
        db.session.commit()
        return notificacion.to_json(), 204

    @role_required(roles=["ADMIN"])
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
    @role_required(roles=["ADMIN"])
    def get(self):
        page=1
        per_page=5

        notificaciones=db.session.query(NotificacionModel)

        if request.args.get('page'):
            page=int(request.args.get('page'))
        if request.args.get('per_page'):
            per_page=int(request.args.get('per_page'))

        notificaciones=notificaciones.paginate(page=page, per_page=per_page, error_out=False)

        return jsonify({'notificaciones':[notificacion.to_json() for notificacion in notificaciones],
                        'total':notificaciones.total,
                       'pages':notificaciones.pages,
                       'per_page':page
                       })
    
    @role_required(roles=["ADMIN"])
    def post(self):
        new_notificacion=NotificacionModel.from_json(request.get_json())
        db.session.add(new_notificacion)
        db.session.commit()
        return new_notificacion.to_json(),201