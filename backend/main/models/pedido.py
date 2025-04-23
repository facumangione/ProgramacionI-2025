from .. import db
from datetime import datetime

class Pedido(db.Model):
    id_pedido=db.Column(db.Integer, primary_key=True)
    id_usuario=db.Column(db.Integer,db.ForeignKey("usuario.id_usuario"),nullable=False)
    fecha=db.Column(db.DateTime,nullable=False)
    estado=db.Column(db.Enum('LISTO','EN PREPARACION','RETIRADO'),nullable=False)
    total=db.Column(db.Float,nullable=False)

    usuario=db.relationship("Usuario", back_populates="pedidos", uselist=False, single_parent=True)


    def to_json(self):
        pedido_json={
            'id_pedido':self.id_pedido,
            'id_usuario':str(self.id_usuario),
            'fecha':str(self.fecha.strftime("%d-%m-%Y %H:%M" )),
            'estado':self.estado,
            'total':self.total
        }
        return pedido_json 
    
    @staticmethod
    def from_json(pedido_json):
        id_pedido=pedido_json.get('id_pedido')
        id_usuario=pedido_json.get('id_usuario')
        fecha=datetime.strptime(pedido_json.get('fecha'),'%d-%m-%Y %H:%M')
        estado=pedido_json.get('estado')
        total=pedido_json.get('total')
        return Pedido(id_pedido=id_pedido,
                       id_usuario=id_usuario,
                       fecha=fecha,
                       estado=estado,
                       total=total
                       )