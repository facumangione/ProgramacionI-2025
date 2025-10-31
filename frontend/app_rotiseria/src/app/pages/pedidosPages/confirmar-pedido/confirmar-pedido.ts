import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Footer } from '../../../components/footer/footer';
import { Header } from '../../../components/header/header';
import { ComidasSvc } from '../../../services/comidas';
import { PedidosSvc } from '../../../services/pedidos-svc';

@Component({
  selector: 'app-confirmar-pedido',
  imports: [Footer,Header],
  templateUrl: './confirmar-pedido.html',
  styleUrl: './confirmar-pedido.css'
})
export class ConfirmarPedido {

  comida: any = null;

  constructor(private route: ActivatedRoute,
    private router: Router, 
    private location: Location,
    private comidasSvc: ComidasSvc,
    private pedidoSvc: PedidosSvc,
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id_comida'));
    this.comidasSvc.getComidaById(id).subscribe({
    next: (res) => {
      console.log('Comida encontrada:', res);
      this.comida = {
        ...res,
        image: `assets/${res.nombre.toLowerCase()}.jpg`,
        alt: res.nombre
      };
    },
    error: (err) => {
      console.error('Error al traer comida:', err);
    }
  });
  }

  goBack() {
    this.location.back(); 
  }

  
  crearPedido(){

    const now = new Date();
    const fechaActual=now.getDate()+'-'+(now.getMonth()+1)+'-'+now.getFullYear()+' '+now.getHours()+':'+now.getMinutes();

    this.pedidoSvc.postPedido({
      id_usuario: Number(localStorage.getItem('id_usuario')),
      fecha: fechaActual,
      estado: 'EN PREPARACION',
      total: String(this.comida.precio),
      comidas: [this.comida.id_comida]
    }).subscribe({
      next: (res) => {
        console.log('Pedido creado exitosamente:', res);
        alert('Pedido creado exitosamente');
        this.goToPedidoResumen(res.id_pedido);
      },
      error: (err) => {
        console.error('Error al crear pedido', err);
        alert('Error al crear pedido');
      }
    });

  }

  goToPedidoResumen(id_pedido:number){  
    this.router.navigate(['/pedido',id_pedido,'resumen'])
  }
}


