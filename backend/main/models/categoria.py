from .. import db

class Categoria(db.Model):
    id_categoria = db.Column(db.Integer, primary_key=True)
    nombre       = db.Column(db.String(50), nullable=False, unique=True)

    def to_json(self):
        return {
            'id_categoria': self.id_categoria,
            'nombre':       self.nombre
        }

    @staticmethod
    def from_json(data):
        return Categoria(nombre=data.get('nombre'))
