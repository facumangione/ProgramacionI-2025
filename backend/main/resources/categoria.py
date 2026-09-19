from flask_restful import Resource
from flask import request, jsonify
from ..models.init import CategoriaModel
from .. import db
from main.auth.decorators import role_required, active_user

class Categoria(Resource):
    def get(self, id):
        cat = db.session.query(CategoriaModel).get_or_404(id)
        return cat.to_json()

    @active_user
    @role_required(roles=['ADMIN'])
    def put(self, id):
        cat  = db.session.query(CategoriaModel).get_or_404(id)
        data = request.get_json().items()
        for key, value in data:
            setattr(cat, key, value)
        db.session.add(cat)
        db.session.commit()
        return cat.to_json(), 201

    @active_user
    @role_required(roles=['ADMIN'])
    def delete(self, id):
        cat = db.session.query(CategoriaModel).get_or_404(id)
        db.session.delete(cat)
        db.session.commit()
        return cat.to_json()

class Categorias(Resource):
    def get(self):
        cats = db.session.query(CategoriaModel).all()
        return jsonify({'categorias': [c.to_json() for c in cats]})

    @active_user
    @role_required(roles=['ADMIN'])
    def post(self):
        cat = CategoriaModel.from_json(request.get_json())
        db.session.add(cat)
        db.session.commit()
        return cat.to_json(), 201
