from flask_restful import Resource
from flask import request,jsonify
from ..models.init import ComidaModel, PedidoModel, ResenaModel
from .. import db
from sqlalchemy import func,desc
from flask_jwt_extended import jwt_required,get_jwt_identity,get_jwt
from main.auth.decorators import role_required,active_user

class Comida(Resource):
    @jwt_required(optional=True)
    def get(self, id):
        comida=db.session.query(ComidaModel).get_or_404(id)
        return comida.to_json()

    @active_user
    @role_required(roles=['ADMIN'])
    def delete(self, id):
        comida=db.session.query(ComidaModel).get_or_404(id)
        db.session.delete(comida)
        db.session.commit()
        return comida.to_json(), 204

    @active_user
    @role_required(roles=['ADMIN','EMPLEADO'])
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

        if request.args.get('CantPedidosYValoracion'):
            
            valoracion_subquery = (
                db.session.query(
                    ResenaModel.id_comida,
                    func.avg(ResenaModel.calificacion).label('valoracion_promedio')
                )
                .group_by(ResenaModel.id_comida)
                .subquery()
            )
            
            pedidos_subquery = (
                db.session.query(
                    ComidaModel.id_comida,
                    func.count(PedidoModel.id_pedido).label('cantidad_pedidos')
                )
                .outerjoin(PedidoModel.comidas)
                .group_by(ComidaModel.id_comida)
                .subquery()
            )
            
            comidas = (
                db.session.query(ComidaModel)
                .outerjoin(pedidos_subquery, ComidaModel.id_comida == pedidos_subquery.c.id_comida)
                .outerjoin(valoracion_subquery, ComidaModel.id_comida == valoracion_subquery.c.id_comida)
                .order_by(
                    desc(func.coalesce(pedidos_subquery.c.cantidad_pedidos, 0)),
                    desc(func.coalesce(valoracion_subquery.c.valoracion_promedio, 0))
                )
            )

        comidas=comidas.paginate(page=page, per_page=per_page, error_out=False)

        return jsonify({'comidas':[comida.to_json() for comida in comidas],
                        'total':comidas.total,
                       'pages':comidas.pages,
                       'per_page':page
                       })
    
    @active_user
    @role_required(roles=['ADMIN'])
    def post(self):
        new_comida=ComidaModel.from_json(request.get_json())
        db.session.add(new_comida)
        db.session.commit()
        return new_comida.to_json(),201