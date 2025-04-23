from .. import db
from datetime import datetime

class Notificacion(db.Model):
    id_notificacion=db.Column(db.Integer, primary_key=True)
    id_usuario=db.Column(db.Integer,db.ForeignKey("usuario.id_usuario"),nullable=False)
    mensaje=db.Column(db.String(100),nullable=False)
    fecha=db.Column(db.DateTime,nullable=False)

    usuario=db.relationship("Usuario", back_populates="notificaciones", uselist=False, single_parent=True)

    def to_json(self):
        notificacion_json={
            'id_notificacion':self.id_notificacion,
            'id_usuario':str(self.id_usuario),
            'mensaje':str(self.mensaje),
            'fecha':str(self.fecha.strftime("%d-%m-%Y %H:%M" ))
        }
        return notificacion_json 
    
    @staticmethod
    def from_json(notificacion_json):
        id_notificacion=notificacion_json.get('id_notificacion')
        id_usuario=notificacion_json.get('id_usuario')
        mensaje=notificacion_json.get('mensaje')
        fecha=datetime.strptime(notificacion_json.get('fecha'),'%d-%m-%Y %H:%M')
        return Notificacion(id_notificacion=id_notificacion,
                       id_usuario=id_usuario,
                       mensaje=mensaje,
                       fecha=fecha,
                       )