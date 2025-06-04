from flask_restful import Resource
from flask import request, jsonify
from .. import db
from ..models.init import pedidos_comidasModel
from flask_jwt_extended import jwt_required,get_jwt_identity,get_jwt
from main.auth.decorators import role_required

class Anadir_carrito(Resource):
    @role_required(roles=["ADMIN",'CLIENTE'])
    def post(self):
        id_pedido=request.get_json().get('id_pedido')
        id_comida=request.get_json().get('id_comida')

        if id_pedido is None:
            print("Pedido no encontrado")
        if id_comida is None:
            print("Comida no encontrada")

        query=pedidos_comidasModel.insert().values(id_pedido=id_pedido, id_comida=id_comida)
        try:
            db.session.execute(query)
            db.session.commit()
        except:
            return 'Formato no correcto', 400
        return 'Creado con exito', 201