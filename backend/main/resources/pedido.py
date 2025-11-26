from flask_restful import Resource
from flask import request,jsonify
from sqlalchemy import func
from ..models.init import PedidoModel, ComidaModel, UsuarioModel
from .. import db
from datetime import datetime
from flask_jwt_extended import get_jwt_identity,get_jwt
from main.auth.decorators import role_required,active_user
from main.mail.functions import sendMail

class Pedido(Resource):
    
    @active_user
    @role_required(roles=["ADMIN",'CLIENTE','EMPLEADO'])
    def get(self,id):
        pedido=db.session.query(PedidoModel).get_or_404(id)
        rol=get_jwt().get('rol')
        if rol=='CLIENTE' and pedido.id_usuario!=get_jwt_identity():
            return 'No tiene permiso para ver este pedido',403
        return pedido.to_json()

    @active_user
    @role_required(roles=["ADMIN",'EMPLEADO'])
    def delete(self,id):
        pedido=db.session.query(PedidoModel).get_or_404(id)
        rol=get_jwt().get('rol')

        if rol=='CLIENTE' and pedido.id_usuario!=get_jwt_identity():
            return 'No tiene permiso para eliminar este pedido',403
        
        if rol=='CLIENTE' and pedido.estado==['LISTO','ENTREGADO']:
            return 'Ya completo este pedido, no puede eliminarlo'
        
        usuario = db.session.query(UsuarioModel).get(pedido.id_usuario)
        if usuario and usuario.mail:
            sendMail(
                [usuario.mail], 
                'Pedido cancelado', 
                'pedido_cancelado', 
                usuario={'nombre': usuario.nombre}, 
                pedido=pedido
        )

        db.session.delete(pedido)
        db.session.commit()
        return pedido.to_json(), 204

    @active_user
    @role_required(roles=["ADMIN",'EMPLEADO'])
    def put(self,id):
        pedido=db.session.query(PedidoModel).get_or_404(id)
        data=request.get_json().items()

        for key,value in data:
            if key == 'fecha':
                value = datetime.strptime(value, "%d-%m-%Y %H:%M")
            setattr(pedido,key,value)

        db.session.add(pedido)
        db.session.commit()

        usuario = db.session.query(UsuarioModel).get(pedido.id_usuario)
        if usuario and usuario.mail:
            sendMail(
                [usuario.mail], 
                'Actualización de tu pedido', 
                'estado_pedido', 
                usuario={'nombre': usuario.nombre}, 
                pedido=pedido
            )

        return pedido.to_json(),201
    
class Pedidos(Resource):

    @active_user
    @role_required(roles=["ADMIN","CLIENTE",'EMPLEADO'])
    def get(self):
        page=1
        per_page=5

        pedidos=db.session.query(PedidoModel)

        if request.args.get('page'):
            page=int(request.args.get('page'))
        if request.args.get('per_page'):
            per_page=int(request.args.get('per_page'))

        if request.args.get('estado'):
            pedidos=pedidos.filter(PedidoModel.estado.like("%"+request.args.get('estado')+"%"))

        if request.args.get('desc'):
            pedidos=pedidos.order_by(PedidoModel.fecha.desc())

        if request.args.get('id_usuario'):
            pedidos=pedidos.filter(PedidoModel.id_usuario.like("%"+request.args.get('id_usuario')+"%"))

        if request.args.get('id_pedido'):
            pedidos=pedidos.filter(PedidoModel.id_pedido.like("%"+request.args.get('id_pedido')+"%"))

        pedidos=pedidos.paginate(page=page, per_page=per_page, error_out=False)

        return jsonify({'pedidos':[pedido.to_json() for pedido in pedidos],
                        'total':pedidos.total,
                       'pages':pedidos.pages,
                       'per_page':page})
    
    @active_user
    @role_required(roles=["ADMIN","CLIENTE",'EMPLEADO'])
    def post(self):
        comidas_ids=request.get_json().get('comidas')
        new_pedido=PedidoModel.from_json(request.get_json())
        mail=get_jwt().get('mail')
        nombre= get_jwt().get('nombre')
        
        if comidas_ids:
            comidas=ComidaModel.query.filter(ComidaModel.id_comida.in_(comidas_ids)).all()
            new_pedido.comidas.extend(comidas)

        db.session.add(new_pedido)
        db.session.commit()

        send = sendMail([mail], 'Pedido confirmado', 'pedido', usuario={'nombre': nombre}, pedido=new_pedido)
        return new_pedido.to_json(),201