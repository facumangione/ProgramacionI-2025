from flask_restful import Resource
from flask import request

USUARIOS={
    1:{'nombre_apellido':'Pedro Gonzalez','DNI':'45956487','telefono':'2616754862','mail':'pedrogonzalez@gmail.com'},
    2:{'nombre_apellido':'Martin Gutierrez','DNI':'42659715','telefono':'2616475123','mail':'martingutierrez@gmail.com'},
    3:{'nombre_apellido':'Juan Ortiz','DNI':'44652178','telefono':'2617512648','mail':'juanortiz@gmail.com'}
}

class Usuario(Resource):
    def get(self,id):
        if int(id) in USUARIOS:
            return USUARIOS[int(id)]
        return 'El id es inexistente',404

    def delete(self,id):
        if int(id) in USUARIOS:
            del USUARIOS[int(id)]
            return 'Eliminado con exito',204
        return 'El id a eliminar es inexistente',404

    def put(self,id):
        if int(id) in USUARIOS:
            user=USUARIOS[int(id)]
            data=request.get_json()
            user.update(data)
            return 'Usuario editado con exito',201
        return 'El id que intentan editar es inexistente',404
    
class Usuarios(Resource):
    def get(self):
        return USUARIOS
    
    def post(self):
        new_user=request.get_json()
        id=int(max(USUARIOS.keys()))+1
        USUARIOS[id]=new_user
        return 'Creado con exito',201