import { Component } from '@angular/core';
import { Header } from '../../../components/header/header';
import { Footer } from '../../../components/footer/footer';
import { PedidosSvc } from '../../../services/pedidos-svc';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-resumen-pedido',
  imports: [Header,Footer],
  templateUrl: './resumen-pedido.html',
  styleUrl: './resumen-pedido.css'
})
export class ResumenPedido {

  pedido: any = null;

  constructor(private route: ActivatedRoute,
    private router: Router, 
    private pedidosSvc: PedidosSvc) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id_pedido'));
    this.pedidosSvc.getPedidoById(id).subscribe({
    next: (res) => {
      console.log('Pedido encontrado:', res);
      this.pedido = res;
    },
    error: (err) => {
      console.error('Error al traer pedidos:', err);
    }
    });
  }

  getComida(pedido: any): string {
    if (!pedido.comidas || pedido.comidas.length === 0) {
      return 'Sin comidas';
    }
    return pedido.comidas.map((c: any) => c.nombre).join(', ');
  }
  
}
