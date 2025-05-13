from flask_restful import Resource
from flask import request,jsonify
from ..models.init import PedidoModel, ComidaModel
from .. import db
from datetime import datetime

class Pedido(Resource):
    def get(self,id):
        pedido=db.session.query(PedidoModel).get_or_404(id)
        return pedido.to_json()

    def delete(self,id):
        pedido=db.session.query(PedidoModel).get_or_404(id)
        db.session.delete(pedido)
        db.session.commit()
        return pedido.to_json(), 204

    def put(self,id):
        pedido=db.session.query(PedidoModel).get_or_404(id)
        data=request.get_json().items()
        for key,value in data:
            if key == 'fecha':
                value = datetime.strptime(value, "%d-%m-%Y %H:%M")
            setattr(pedido,key,value)
        db.session.add(pedido)
        db.session.commit()
        return pedido.to_json(),201
    
class Pedidos(Resource):
    def get(self):
        page=1
        per_page=5

        pedidos=db.session.query(PedidoModel)

        if request.args.get('page'):
            page=int(request.args.get('page'))
        if request.args.get('per_page'):
            per_page=int(request.args.get('per_page'))

        pedidos=pedidos.paginate(page=page, per_page=per_page, error_out=False)

        return jsonify({'pedidos':[pedido.to_json() for pedido in pedidos],
                        'total':pedidos.total,
                       'pages':pedidos.pages,
                       'per_page':page})
    
    def post(self):
        comidas_ids=request.get_json().get('comidas')
        new_pedido=PedidoModel.from_json(request.get_json())
        if comidas_ids:
            comidas=ComidaModel.query.filter(ComidaModel.id_comida.in_(comidas_ids)).all()
            new_pedido.comidas.extend(comidas)

        db.session.add(new_pedido)
        db.session.commit()
        return new_pedido.to_json(),201