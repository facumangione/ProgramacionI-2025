from .. import db
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy import func

class Comida(db.Model):
    id_comida = db.Column(db.Integer, primary_key=True)
    nombre=db.Column(db.String(100),nullable=False)
    descripcion=db.Column(db.String(100),nullable=False)
    precio=db.Column(db.Float,nullable=False)
    imagen = db.Column(db.String(200), nullable=True)
    disponibilidad = db.Column(db.Boolean, default=False, nullable=False)

    resenas=db.relationship("Resena", back_populates="comida",cascade="all, delete-orphan")

    @hybrid_property
    def valoracion(self):
        if not self.resenas:
            return None
        
        total = sum(float(resena.calificacion) for resena in self.resenas)
        return round(total / len(self.resenas), 1)
    
    @valoracion.expression
    def valoracion(cls):
        from .resena import Resena
        return (
            db.select(func.avg(Resena.calificacion))
            .where(Resena.id_comida == cls.id_comida)
            .correlate(cls)
            .scalar_subquery()
        )
    
    def to_json(self):
        comida_json = {
            'id_comida': self.id_comida,
            'nombre': str(self.nombre),
            'descripcion': str(self.descripcion),
            'precio': self.precio,
            'imagen': self.imagen,
            'disponibilidad': self.disponibilidad,
            'valoracion': self.valoracion,
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