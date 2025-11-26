from flask_restful import Resource
from flask import request, jsonify
from ..models.init import UsuarioModel
from .. import db
from flask_jwt_extended import jwt_required
from main.auth.decorators import role_required, active_user
from main.mail.functions import sendMail

class EnviarEmailMasivo(Resource):

    @active_user
    @role_required(roles=['ADMIN'])
    def post(self):
        data = request.get_json()
        asunto = data.get('asunto')
        mensaje = data.get('mensaje')
        
        if not asunto or not mensaje:
            return {'error': 'Asunto y mensaje son obligatorios'}, 400
        
        usuarios = db.session.query(UsuarioModel).filter(
            UsuarioModel.activo == True
        ).all()
        
        if not usuarios:
            return {'error': 'No hay usuarios activos para enviar emails'}, 404
        
        emails_destinatarios = [usuario.mail for usuario in usuarios]
        
        try:
            resultado = sendMail(
                to=emails_destinatarios,
                subject=asunto,
                template='mail_masivo',
                mensaje=mensaje
            )
            
            if resultado is True:
                return {
                    'mensaje': 'Emails enviados exitosamente',
                    'cantidad_destinatarios': len(emails_destinatarios),
                    'destinatarios': emails_destinatarios
                }, 200
            else:
                return {'error': 'Error al enviar emails'}, 500
                
        except Exception as e:
            return {'error': f'Error al enviar emails: {str(e)}'}, 500