from .. import db

class Comida(db.Model):
    id_comida = db.Column(db.Integer, primary_key=True)
    nombre=db.Column(db.String(100),nullable=False)
    descripcion=db.Column(db.String(100),nullable=False)
    precio=db.Column(db.Float,nullable=False)
    
    def to_json(self):
        comida_json={
            'id_comida':self.id_comida,
            'nombre':str(self.nombre),
            'descripcion':str(self.descripcion),
            'precio':self.precio
        }
        return comida_json 
    