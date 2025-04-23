from .. import db

class Usuario(db.Model):
    id_usuario = db.Column(db.Integer, primary_key=True)
    nombre=db.Column(db.String(100),nullable=False)
    mail=db.Column(db.String(100),nullable=False)
    telefono=db.Column(db.Integer,nullable=False)
    rol=db.Column(db.Enum('ADMIN','CLIENTE'),nullable=False)

    def to_json(self):
        usuario_json={
            'id_usuario':self.id_usuario,
            'nombre':str(self.nombre),
            'mail':str(self.mail),
            'telefono':self.telefono,
            'rol':self.rol
        }
        return usuario_json 
    
    @staticmethod
    def from_json(usuario_json):
        id_usuario=usuario_json('id_usuario')
        nombre=usuario_json('nombre')
        mail=usuario_json('mail')
        telefono=usuario_json('telefono')
        rol=usuario_json('rol')
        return Usuario(id_usuario=id_usuario,
                       nombre=nombre,
                       mail=mail,
                       telefono=telefono,
                       rol=rol
                       )