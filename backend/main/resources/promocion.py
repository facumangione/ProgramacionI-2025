from flask_restful import Resource
from flask import request, jsonify
from ..models.init import PromocionModel, ComidaModel
from .. import db
from main.auth.decorators import role_required, active_user
from datetime import datetime

# Resource "singular": opera sobre UNA promoción puntual, identificada
# por su id en la URL (/promocion/<id>). Nunca tiene método post,
# porque crear algo nuevo no tiene sentido sobre un id que ya existe.
class Promocion(Resource):

    # GET es público (sin decoradores) porque cualquier visitante,
    # logueado o no, debería poder ver el detalle de una promoción.
    def get(self, id):
        promo = db.session.query(PromocionModel).get_or_404(id)
        return promo.to_json()

    # PUT y DELETE están protegidos: solo ADMIN puede editar/borrar
    # promociones, siguiendo el mismo criterio que usa el proyecto
    # para operaciones sensibles sobre el catálogo (igual que Comida).
    @active_user
    @role_required(roles=['ADMIN'])
    def put(self, id):
        promo = db.session.query(PromocionModel).get_or_404(id)
        data = request.get_json()

        # setattr genérico: actualiza cada campo que venga en el body.
        # Convierto fecha_fin a datetime porque llega como string desde el front.
        if 'fecha_fin' in data:
            data['fecha_fin'] = datetime.strptime(data['fecha_fin'], '%d-%m-%Y')

        for key, value in data.items():
            setattr(promo, key, value)

        db.session.add(promo)
        db.session.commit()
        return promo.to_json(), 201

    @active_user
    @role_required(roles=['ADMIN'])
    def delete(self, id):
        promo = db.session.query(PromocionModel).get_or_404(id)
        promo_json = promo.to_json()   # ← capturamos el JSON ANTES de borrar
        db.session.delete(promo)
        db.session.commit()
        return promo_json


# Resource "plural": opera sobre LA COLECCIÓN completa.
# GET lista (con filtro opcional de solo activas), POST crea una nueva.
class Promociones(Resource):

    def get(self):
        promos = db.session.query(PromocionModel)

        # Filtro opcional: /promociones?solo_activas=true
        # devuelve solo las que están vigentes ahora mismo.
        if request.args.get('solo_activas') == 'true':
            ahora = datetime.now()
            promos = promos.filter(
                PromocionModel.activa == True,
                PromocionModel.fecha_inicio <= ahora,
                PromocionModel.fecha_fin >= ahora
            )

        return jsonify({'promociones': [p.to_json() for p in promos.all()]})

    @active_user
    @role_required(roles=['ADMIN'])
    def post(self):
        data = request.get_json()

        # Validación de negocio antes de crear: la comida debe existir.
        comida = db.session.query(ComidaModel).get(data.get('id_comida'))
        if not comida:
            return {'error': 'La comida indicada no existe'}, 400

        nueva_promo = PromocionModel.from_json(data)
        db.session.add(nueva_promo)
        db.session.commit()
        return nueva_promo.to_json(), 201







