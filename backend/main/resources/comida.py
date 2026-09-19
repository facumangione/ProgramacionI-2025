from flask_restful import Resource
from flask import request,jsonify
import base64
import os
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

        if request.args.get('id_categoria'):
            comidas = comidas.filter(ComidaModel.id_categoria == request.args.get('id_categoria'))
            
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
            

        if request.args.get('OrdenarPorValoracion'):
            valoracion_subquery = (
                db.session.query(
                    ResenaModel.id_comida,
                    func.avg(ResenaModel.calificacion).label('valoracion_promedio'),
                    func.count(ResenaModel.id_resena).label('cantidad_resenas')
                )
                .group_by(ResenaModel.id_comida)
                .subquery()
            )

            comidas = (
                db.session.query(ComidaModel)
                .outerjoin(valoracion_subquery, ComidaModel.id_comida == valoracion_subquery.c.id_comida)
                .order_by(
                    desc(func.coalesce(valoracion_subquery.c.valoracion_promedio, 0)),
                    desc(func.coalesce(valoracion_subquery.c.cantidad_resenas, 0))
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
    
from flask import send_from_directory
import base64, os

class SubirImagenComida(Resource):
    @active_user
    @role_required(roles=['ADMIN'])
    def post(self):
        data = request.get_json()
        nombre     = data.get('nombre')       # nombre del archivo ej: tacos
        imagen_b64 = data.get('imagen_base64') # contenido en base64

        if not nombre or not imagen_b64:
            return {'error': 'Faltan datos'}, 400

        # decodifica el base64 y guarda el archivo
        imagen_bytes = base64.b64decode(imagen_b64)
        ruta_assets = '/home/facundo/Escritorio/ESCRITORIO/ProgramacionI-2025/frontend/app_rotiseria/src/assets'
        nombre_archivo = nombre.lower() + '.jpg'
        ruta_completa  = os.path.join(ruta_assets, nombre_archivo)

        with open(ruta_completa, 'wb') as f:
            f.write(imagen_bytes)

        return {'mensaje': f'Imagen {nombre_archivo} guardada OK'}, 201

class ReponerStock(Resource):
    @active_user
    @role_required(roles=['ADMIN', 'EMPLEADO'])
    def put(self, id):
        comida = db.session.query(ComidaModel).get_or_404(id)
        data = request.get_json()
        cantidad = data.get('cantidad')

        if cantidad is None or cantidad < 0:
            return {'error': 'Cantidad inválida'}, 400

        comida.stock = comida.stock + cantidad
        if comida.stock > 0:
            comida.disponibilidad = True

        db.session.add(comida)
        db.session.commit()
        return comida.to_json(), 200