from flask import request, jsonify, Blueprint
from .. import db
from main.models.init import UsuarioModel
from flask_jwt_extended import jwt_required,get_jwt_identity,create_access_token

auth=Blueprint('auth',__name__,url_prefix='/auth')

@auth.route('/login',methods=['POST'])
def login():
    usuario=db.session.query(UsuarioModel).filter(UsuarioModel.mail==request.get_json().get('mail')).first()
    if (usuario is None) or not (usuario.validate_pass(request.get_json().get("password"))):
        return 'Invalid user or password', 401
    access_token=create_access_token(identity=usuario)
    data={
        'id_usuario':usuario.id_usuario,
        'mail':usuario.mail,
        'access_token':access_token
    }
    return data,200

@auth.route('/signin',methods=['POST'])
def signin():
    usuario=UsuarioModel.from_json(request.get_json())
    exists=db.session.query(UsuarioModel).filter(UsuarioModel.mail==usuario.mail).scalar() is not None
    if exists:
        return 'An account with this email already exists'
    else: 
        try:
            db.session.add(usuario)
            db.session.commit()
        except Exception as error:
            db.session.rollback()
            return str(error),409
        return usuario.to_json(),201

