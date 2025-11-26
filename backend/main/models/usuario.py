from .. import db
from werkzeug.security import generate_password_hash,check_password_hash

class Usuario(db.Model):
    id_usuario = db.Column(db.Integer, primary_key=True)
    nombre=db.Column(db.String(100),nullable=False)
    mail=db.Column(db.String(100),unique=True,index=True,nullable=False)
    password=db.Column(db.String(100),nullable=False)
    telefono=db.Column(db.Integer,nullable=False)
    rol=db.Column(db.Enum('ADMIN','CLIENTE','EMPLEADO'),nullable=False,server_default='CLIENTE')
    activo = db.Column(db.Boolean, default=False, nullable=False)

    resenas=db.relationship("Resena", back_populates="usuario",cascade="all, delete-orphan")
    notificaciones=db.relationship("Notificacion", back_populates="usuario",cascade="all, delete-orphan")
    pedidos=db.relationship("Pedido", back_populates="usuario",cascade="all, delete-orphan")

    @property
    def plain_passsword(self):
        raise AttributeError('password cant be read')

    @plain_passsword.setter
    def plain_password(self,password):
        self.password=generate_password_hash(password)

    def validate_pass(self,password):
        return check_password_hash(self.password,password)
    
    def __repr__(self):
        return '<Usuario: %r >' % (self.nombre)

    def to_json(self):
        usuario_json={
            'id_usuario':self.id_usuario,
            'nombre':str(self.nombre),
            'mail':str(self.mail),
            'telefono':self.telefono,
            'rol':self.rol,
            'activo': self.activo,
            'cantidad_pedidos':len(self.pedidos)
        }
        return usuario_json 
    
    def to_json_nombre(self):
        usuario_json={
            'nombre':str(self.nombre)
        }
        return usuario_json

    @staticmethod
    def from_json(usuario_json):
        id_usuario=usuario_json.get('id_usuario')
        nombre=usuario_json.get('nombre')
        mail=usuario_json.get('mail')
        password=usuario_json.get('password')
        telefono=usuario_json.get('telefono')
        rol=usuario_json.get('rol','CLIENTE')
        activo = usuario_json.get('activo', False)
        return Usuario(id_usuario=id_usuario,
                       nombre=nombre,
                       mail=mail,
                       plain_password=password,
                       telefono=telefono,
                       rol=rol,
                       activo=activo
                       )