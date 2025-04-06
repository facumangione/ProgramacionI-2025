from flask_restful import Resource
from flask import request

USUARIOS={
    1:{'nombre_apellido':'Pedro Gonzalez','DNI':'45956487','telefono':'2616754862','mail':'pedrogonzalez@gmail.com'},
    2:{'nombre_apellido':'Martin Gutierrez','DNI':'42659715','telefono':'2616475123','mail':'martingutierrez@gmail.com'},
    3:{'nombre_apellido':'Juan Ortiz','DNI':'44652178','telefono':'2617512648','mail':'juanortiz@gmail.com'}
}

class Signin(Resource):
    def post(self):
                new_user=request.get_json()
                id=int(max(USUARIOS.keys()))+1
                USUARIOS[id]=new_user
                return 'Creado con exito',201