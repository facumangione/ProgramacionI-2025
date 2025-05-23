from flask_restful import Resource
from flask import request, jsonify
from ..models.init import UsuarioModel, PedidoModel
from .. import db
from sqlalchemy import func,desc

class Usuario(Resource):
    def get(self,id):
        usuario=db.session.query(UsuarioModel).get_or_404(id)
        return usuario.to_json()

    def delete(self,id):
        usuario=db.session.query(UsuarioModel).get_or_404(id)
        db.session.delete(usuario)
        db.session.commit()
        return usuario.to_json(), 204

    def put(self,id):
        usuario=db.session.query(UsuarioModel).get_or_404(id)
        data=request.get_json().items()
        for key,value in data:
            setattr(usuario,key,value)
        db.session.add(usuario)
        db.session.commit()
        return usuario.to_json(),201
    
class Usuarios(Resource):
    def get(self):
        page=1
        per_page=5

        usuarios=db.session.query(UsuarioModel)
        
        if request.args.get('page'):
            page=int(request.args.get('page'))
        if request.args.get('per_page'):
            per_page=int(request.args.get('per_page'))

        if request.args.get('MayorCantPedido'):
            usuarios = usuarios.outerjoin(UsuarioModel.pedidos).group_by(UsuarioModel.id_usuario).order_by(func.count(PedidoModel.id_pedido).desc())

        usuarios=usuarios.paginate(page=page, per_page=per_page, error_out=False)

        return jsonify({'usuarios':[usuario.to_json() for usuario in usuarios],
                       'total':usuarios.total,
                       'pages':usuarios.pages,
                       'per_page':page
                       })
    
    def post(self):
        new_usuario=UsuarioModel.from_json(request.get_json())
        db.session.add(new_usuario)
        db.session.commit()
        return new_usuario.to_json(),201