from .. import db

class Notificacion(db.Model):
    id_notificacion=db.Column(db.Integer, primary_key=True)
    id_usuario=db.Column(db.Integer,nullable=False)
    mensaje=db.Column(db.String(100),nullable=False)
    fecha=db.Column(db.DateTime,nullable=False)

    def to_json(self):
        notificacion_json={
            'id_notificacion':self.id_notificacion,
            'id_usuario':str(self.id_usuario),
            'mensaje':str(self.mensaje),
            'fecha':self.fecha,
        }
        return notificacion_json 
    
    @staticmethod
    def from_json(notificacion_json):
        id_notificacion=notificacion_json('id_notificacion')
        id_usuario=notificacion_json('id_usuario')
        mensaje=notificacion_json('mensaje')
        fecha=notificacion_json('fecha')
        return Notificacion(id_notificacion=id_notificacion,
                       id_usuario=id_usuario,
                       mensaje=mensaje,
                       fecha=fecha,
                       )