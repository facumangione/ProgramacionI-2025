from main import create_app
from apscheduler.schedulers.background import BackgroundScheduler
import os

app = create_app()
app.app_context().push()

from main import db
from main.models.pedido import Pedido
from datetime import datetime, timedelta

def actualizar_estados():
    with app.app_context():
        ahora = datetime.now()
        pedidos = db.session.query(Pedido).all()

        for pedido in pedidos:
            if pedido.estado == 'PENDIENTE':
                if ahora - pedido.fecha >= timedelta(seconds=30):
                    pedido.estado = 'EN PREPARACION'
                    print(f'Pedido {pedido.id_pedido} → EN PREPARACION')

            elif pedido.estado == 'EN PREPARACION':
                if ahora - pedido.fecha >= timedelta(minutes=1):
                    pedido.estado = 'LISTO'
                    print(f'Pedido {pedido.id_pedido} → LISTO')

            elif pedido.estado == 'LISTO':
                if ahora - pedido.fecha >= timedelta(minutes=2):
                    pedido.estado = 'ENTREGADO'
                    print(f'Pedido {pedido.id_pedido} → ENTREGADO')

        db.session.commit()

scheduler = BackgroundScheduler()
scheduler.add_job(actualizar_estados, 'interval', seconds=30)
scheduler.start()

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True, port=os.getenv('PORT'), use_reloader=False)