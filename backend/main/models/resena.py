from .. import db

class Resena(db.Model):
    id_resena=db.Column(db.Integer, primary_key=True)
    id_usuario=db.Column(db.Integer,db.ForeignKey("usuario.id_usuario"),nullable=False)
    id_comida=db.Column(db.Integer,db.ForeignKey("comida.id_comida"),nullable=False)
    comentario=db.Column(db.String(100))
    calificacion=db.Column(db.Numeric(2,1),nullable=False)

    usuario=db.relationship("Usuario", back_populates="resenas", uselist=False, single_parent=True)
    comida=db.relationship("Comida", back_populates="resenas", uselist=False, single_parent=True)
    
    def to_json(self):
        resena_json={
            'id_resena':self.id_resena,
            'id_usuario':self.id_usuario,
            'id_comida':self.id_comida,
            'comentario':str(self.comentario),
            'calificacion':float(self.calificacion),
        }
        return resena_json 
    
    @staticmethod
    def from_json(resena_json):
        id_resena=resena_json.get('id_resena')
        id_usuario=resena_json.get('id_usuario')
        id_comida=resena_json.get('id_comida')
        comentario=resena_json.get('comentario')
        calificacion=resena_json.get('calificacion')
        return Resena(id_resena=id_resena,
                      id_usuario=id_usuario,
                      id_comida=id_comida,
                      comentario=comentario,
                      calificacion=calificacion
                       )