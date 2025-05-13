from flask_restful import Resource
from flask import request,jsonify
from ..models.init import ComidaModel
from .. import db

# Simulación de base de datos para comidas
COMIDAS = {
    1: {'nombre': 'Hamburguesa', 'descripcion': 'Doble carne con queso', 'precio': 5000},
    2: {'nombre': 'Pizza', 'descripcion': 'Muzzarella con aceitunas', 'precio': 8000},
    3: {'nombre': 'Fideos', 'descripcion': 'Con salsa bolognesa', 'precio': 4500}
}

class Comida(Resource):
    def get(self, id):
        comida=db.session.query(ComidaModel).get_or_404(id)
        return comida.to_json()

    def delete(self, id):
        comida=db.session.query(ComidaModel).get_or_404(id)
        db.session.delete(comida)
        db.session.commit()
        return comida.to_json(), 204

    def put(self, id):
        comida=db.session.query(ComidaModel).get_or_404(id)
        data=request.get_json().items()
        for key,value in data:
            setattr(comida,key,value)
        db.session.add(comida)
        db.session.commit()
        return comida.to_json(),201
    
class Comidas(Resource):
    def get(self):
        page=1
        per_page=5

        comidas=db.session.query(ComidaModel)

        if request.args.get('page'):
            page=int(request.args.get('page'))
        if request.args.get('per_page'):
            per_page=int(request.args.get('per_page'))

        comidas=comidas.paginate(page=page, per_page=per_page, error_out=False)

        return jsonify({'comidas':[comida.to_json() for comida in comidas],
                        'total':comidas.total,
                       'pages':comidas.pages,
                       'per_page':page
                       })
    
    def post(self):
        new_comida=ComidaModel.from_json(request.get_json())
        db.session.add(new_comida)
        db.session.commit()
        return new_comida.to_json(),201