from .. import db

class Pedido(db.Model):
    id_pedido=db.Column(db.Integer, primary_key=True)
    id_usuario=db.Column(db.Integer,nullable=False)
    fecha=db.Column(db.DateTime,nullable=False)
    estado=db.Column(db.Enum('LISTO','EN PREPARACION','RETIRADO'),nullable=False)
    total=db.Column(db.Float,nullable=False)

    def to_json(self):
        pedido_json={
            'id_pedido':self.id_pedido,
            'if_usuario':str(self.id_usuario),
            'fecha':self.fecha,
            'estado':self.estado,
            'total':self.total
        }
        return pedido_json 
    
    @staticmethod
    def from_json(pedido_json):
        id_pedido=pedido_json('id_pedido')
        id_usuario=pedido_json('id_usuario')
        fecha=pedido_json('fecha')
        estado=pedido_json('estado')
        total=pedido_json('total')
        return Pedido(id_pedido=id_pedido,
                       id_usuario=id_usuario,
                       fecha=fecha,
                       estado=estado,
                       total=total
                       )