from .. import db
from datetime import datetime


pedidos_comidas=db.Table("pedidos_comidas",
    db.Column("id_pedido",db.Integer,db.ForeignKey("pedido.id_pedido"),primary_key=True),
    db.Column("id_comida",db.Integer,db.ForeignKey("comida.id_comida"),primary_key=True)
    )

class Pedido(db.Model):
    id_pedido=db.Column(db.Integer, primary_key=True)
    id_usuario=db.Column(db.Integer,db.ForeignKey("usuario.id_usuario"),nullable=False)
    fecha=db.Column(db.DateTime,nullable=False)
    estado=db.Column(db.Enum('LISTO','EN PREPARACION','RETIRADO'),nullable=False)
    total=db.Column(db.Float,nullable=False)

    usuario=db.relationship("Usuario", back_populates="pedidos", uselist=False, single_parent=True)
    comidas=db.relationship("Comida",secondary=pedidos_comidas,backref=db.backref("pedidos",lazy='dynamic'))


    def to_json(self):
        pedido_json={
            'id_pedido':self.id_pedido,
            'id_usuario':str(self.id_usuario),
            'fecha':str(self.fecha.strftime("%d-%m-%Y %H:%M" )),
            'estado':self.estado,
            'total':self.total,
            'comidas': [comida.to_json() for comida in self.comidas],
        }
        return pedido_json 
    
    @staticmethod
    def from_json(pedido_json):
        id_pedido=pedido_json.get('id_pedido')
        id_usuario=pedido_json.get('id_usuario')
        fecha=datetime.strptime(pedido_json.get('fecha'),'%d-%m-%Y %H:%M')
        estado=pedido_json.get('estado')
        total=float(pedido_json.get('total'))
        return Pedido(id_pedido=id_pedido,
                       id_usuario=id_usuario,
                       fecha=fecha,
                       estado=estado,
                       total=total
                       )
    