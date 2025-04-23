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
    
    @staticmethod
    def from_json(comida_json):
        id_comida=comida_json('id_comida')
        nombre=comida_json('nombre')
        descripcion=comida_json('descripcion')
        precio=comida_json('precio')
        return Comida(id_comida=id_comida,
                       nombre=nombre,
                       descripcion=descripcion,
                       precio=precio,
                       )