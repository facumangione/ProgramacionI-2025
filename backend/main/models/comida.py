from .. import db

class Comida(db.Model):
    id_comida = db.Column(db.Integer, primary_key=True)
    nombre=db.Column(db.String(100),nullable=False)
    descripcion=db.Column(db.String(100),nullable=False)
    precio=db.Column(db.Float,nullable=False)

    resenas=db.relationship("Resena", back_populates="comida",cascade="all, delete-orphan")
    
    def to_json(self):
        comida_json={
            'id_comida':self.id_comida,
            'nombre':str(self.nombre),
            'descripcion':str(self.descripcion),
            'precio':self.precio
        }
        return comida_json 
    
    @staticmethod
    def from_json(comida_json):
        id_comida=comida_json.get('id_comida')
        nombre=comida_json.get('nombre')
        descripcion=comida_json.get('descripcion')
        precio=comida_json.get('precio')
        return Comida(id_comida=id_comida,
                       nombre=nombre,
                       descripcion=descripcion,
                       precio=precio,
                       )