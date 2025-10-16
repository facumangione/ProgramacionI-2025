import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Footer } from '../../../components/footer/footer';
import { Header } from '../../../components/header/header';
import { ComidasSvc } from '../../../services/comidas';

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
    private comidasSvc: ComidasSvc
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

  //este debe realizar el post de pedido luego
  goToPedidoResumen(){  
    const id_pedido=1
    this.router.navigate(['/pedido',id_pedido,'resumen'])
  }
}


