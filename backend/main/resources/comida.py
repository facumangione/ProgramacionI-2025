from flask_restful import Resource
from flask import request,jsonify
from ..models.init import ComidaModel, PedidoModel
from .. import db
from sqlalchemy import func,desc
from flask_jwt_extended import jwt_required,get_jwt_identity,get_jwt
from main.auth.decorators import role_required

class Comida(Resource):
    @jwt_required(optional=True)
    def get(self, id):
        comida=db.session.query(ComidaModel).get_or_404(id)
        return comida.to_json()

    @role_required(roles=['ADMIN'])
    def delete(self, id):
        comida=db.session.query(ComidaModel).get_or_404(id)
        db.session.delete(comida)
        db.session.commit()
        return comida.to_json(), 204

    @role_required(roles=['ADMIN'])
    def put(self, id):
        comida=db.session.query(ComidaModel).get_or_404(id)
        data=request.get_json().items()
        for key,value in data:
            setattr(comida,key,value)
        db.session.add(comida)
        db.session.commit()
        return comida.to_json(),201
    
class Comidas(Resource):

    @jwt_required(optional=True)
    def get(self):
        page=1
        per_page=5

        comidas=db.session.query(ComidaModel)

        if request.args.get('page'):
            page=int(request.args.get('page'))
        if request.args.get('per_page'):
            per_page=int(request.args.get('per_page'))

        if request.args.get('MayorCantPedidos'):
            comidas = comidas.outerjoin(PedidoModel.comidas).group_by(ComidaModel.id_comida).order_by(func.count().desc())

        comidas=comidas.paginate(page=page, per_page=per_page, error_out=False)

        return jsonify({'comidas':[comida.to_json() for comida in comidas],
                        'total':comidas.total,
                       'pages':comidas.pages,
                       'per_page':page
                       })
    
    @role_required(roles=['ADMIN'])
    def post(self):
        new_comida=ComidaModel.from_json(request.get_json())
        db.session.add(new_comida)
        db.session.commit()
        return new_comida.to_json(),201