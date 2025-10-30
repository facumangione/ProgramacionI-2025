from flask_restful import Resource
from flask import request,jsonify
from ..models.init import ResenaModel
from .. import db
from flask_jwt_extended import jwt_required,get_jwt_identity,get_jwt
from main.auth.decorators import role_required

class Resena(Resource):
    @jwt_required(optional=True)
    def get(self, id):
        resena=db.session.query(ResenaModel).get_or_404(id)
        return resena.to_json()

    @role_required(roles=["ADMIN",'CLIENTE'])
    def delete(self, id):
        resena=db.session.query(ResenaModel).get_or_404(id)
        rol=get_jwt().get('rol')
        if rol=='CLIENTE' and resena.id_usuario!=get_jwt_identity():
            return 'No tiene permiso para eliminar esta reseña',403
        db.session.delete(resena)
        db.session.commit()
        return resena.to_json(), 204
    
    @role_required(roles=["ADMIN",'CLIENTE'])
    def put(self,id):
        resena=db.session.query(ResenaModel).get_or_404(id)
        rol=get_jwt().get('rol')
        if rol=='CLIENTE' and resena.id_usuario!=get_jwt_identity():
            return 'No tiene permiso para eliminar esta reseña',403
        data=request.get_json().items()
        for key,value in data:
            setattr(resena,key,value)
        db.session.add(resena)
        db.session.commit()
        return resena.to_json(),201

class Resenas(Resource):
    @jwt_required(optional=True)
    def get(self):
        page=1
        per_page=5

        resenas=db.session.query(ResenaModel)

        if request.args.get('page'):
            page=int(request.args.get('page'))
        if request.args.get('per_page'):
            per_page=int(request.args.get('per_page'))

        if request.args.get('id_usuario'):
            resenas=resenas.filter(ResenaModel.id_usuario.like("%"+request.args.get('id_usuario')+"%"))

        if request.args.get('id_comida'):
            resenas=resenas.filter(ResenaModel.id_comida.like("%"+request.args.get('id_comida')+"%"))    

        resenas=resenas.paginate(page=page, per_page=per_page, error_out=False)

        return jsonify({'resenas':[resena.to_json() for resena in resenas],
                        'total':resenas.total,
                       'pages':resenas.pages,
                       'per_page':page})
    
    @role_required(roles=['ADMIN','CLIENTE'])
    def post(self):
        new_resena=ResenaModel.from_json(request.get_json())
        db.session.add(new_resena)
        db.session.commit()
        return new_resena.to_json(),201