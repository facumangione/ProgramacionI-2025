from .. import db
from datetime import datetime

# Modelo que representa una promoción aplicada a una comida específica.
# Hereda de db.Model como todos los modelos del proyecto -> SQLAlchemy
# lo mapea automáticamente a una tabla llamada "promocion".
class Promocion(db.Model):
    id_promocion = db.Column(db.Integer, primary_key=True)
    titulo       = db.Column(db.String(100), nullable=False)
    descripcion  = db.Column(db.String(200), nullable=True)
    porcentaje_descuento = db.Column(db.Integer, nullable=False)

    # Foreign Key: cada promoción pertenece a UNA comida (relación N:1,
    # una comida puede tener varias promociones a lo largo del tiempo)
    id_comida    = db.Column(db.Integer, db.ForeignKey("comida.id_comida"), nullable=False)

    fecha_inicio = db.Column(db.DateTime, nullable=False, default=datetime.now)
    fecha_fin    = db.Column(db.DateTime, nullable=False)
    activa       = db.Column(db.Boolean, default=True, nullable=False)

    # relationship: permite navegar promocion.comida sin escribir JOIN a mano.
    # No crea ninguna columna nueva, solo usa la FK de arriba.
    comida = db.relationship("Comida")

    # Convierte el objeto Python a diccionario para poder devolverlo
    # como JSON en las respuestas de la API.
    def to_json(self):
        return {
            'id_promocion': self.id_promocion,
            'titulo': self.titulo,
            'descripcion': self.descripcion,
            'porcentaje_descuento': self.porcentaje_descuento,
            'id_comida': self.id_comida,
            'comida': self.comida.nombre if self.comida else None,  # nombre legible, no solo el id
            'fecha_inicio': self.fecha_inicio.strftime('%d-%m-%Y') if self.fecha_inicio else None,
            'fecha_fin': self.fecha_fin.strftime('%d-%m-%Y') if self.fecha_fin else None,
            'activa': self.activa
        }

    # Construye un objeto Promocion a partir del JSON que llega en el
    # body de un request (request.get_json()). Es @staticmethod porque
    # no necesita una instancia ya creada para poder llamarse.
    @staticmethod
    def from_json(data):
        return Promocion(
            titulo = data.get('titulo'),
            descripcion = data.get('descripcion'),
            porcentaje_descuento = data.get('porcentaje_descuento'),
            id_comida = data.get('id_comida'),
            fecha_fin = datetime.strptime(data.get('fecha_fin'), '%d-%m-%Y'),  # string -> objeto datetime
            activa = data.get('activa', True)
        )
        
        
#