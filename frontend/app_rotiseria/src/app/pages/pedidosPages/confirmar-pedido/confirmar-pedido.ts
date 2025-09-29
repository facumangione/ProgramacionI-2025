import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Footer } from '../../../components/footer/footer';
import { Header } from '../../../components/header/header';

@Component({
  selector: 'app-confirmar-pedido',
  imports: [Footer,Header],
  templateUrl: './confirmar-pedido.html',
  styleUrl: './confirmar-pedido.css'
})
export class ConfirmarPedido {

  comida: any = null;

  comidas=[
    {
      id_comida:1,
      nombre: 'Spaghetti a la Fileto',
      descripcion:'Al estilo italiano',
      precio: 1500,
      image: 'assets/spaghetti.jpg',
      alt:'Spaghetti a la Fileto'
    },
    {
      id_comida:2,
      nombre: 'Lasagna',
      descripcion:'Con Salsa Boloñesa',
      precio: 1600,
      image: 'assets/lasagna.jpg',
      alt:'Lasagna'
    },
    {
      id_comida:3,
      nombre: 'Ñoquis a la sazón',
      descripcion:'Con Yogur y Panceta',
      precio: 1800,
      image: 'assets/noquis.jpg',
      alt:'Ñoquis'
    } 
  ]

  constructor(private route: ActivatedRoute, private router: Router, private location: Location) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id_comida'));
    this.comida = this.comidas.find(comida => comida.id_comida === id);
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


