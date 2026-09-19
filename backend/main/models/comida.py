from .. import db
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy import func
from sqlalchemy import event

class Comida(db.Model):
    id_comida = db.Column(db.Integer, primary_key=True)
    nombre=db.Column(db.String(100),nullable=False)
    descripcion=db.Column(db.String(100),nullable=False)
    precio=db.Column(db.Float,nullable=False)
    imagen = db.Column(db.String(200), nullable=True)
    disponibilidad = db.Column(db.Boolean, default=True, nullable=False)
    stock          = db.Column(db.Integer, default=0, nullable=False)
    id_categoria   = db.Column(db.Integer, db.ForeignKey("categoria.id_categoria"), nullable=True)

    resenas=db.relationship("Resena", back_populates="comida",cascade="all, delete-orphan")
    categoria = db.relationship("Categoria")

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
            'stock': self.stock,
            'id_categoria': self.id_categoria,
            'categoria': self.categoria.nombre if self.categoria else None,
            'valoracion': self.valoracion,
        }
        return comida_json  
    
    @staticmethod
    def from_json(comida_json):
        return Comida(
            nombre         = comida_json.get('nombre'),
            descripcion    = comida_json.get('descripcion'),
            precio         = comida_json.get('precio'),
            imagen         = comida_json.get('imagen'),
            disponibilidad = comida_json.get('disponibilidad', True),
            stock          = comida_json.get('stock', 0),
            id_categoria   = comida_json.get('id_categoria')
        )
    
@event.listens_for(Comida, 'before_insert')
@event.listens_for(Comida, 'before_update')
def actualizar_disponibilidad_por_stock(mapper, connection, target):
    if target.stock <= 0:
        target.disponibilidad = False