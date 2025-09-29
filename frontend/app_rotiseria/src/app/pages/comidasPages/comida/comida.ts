import { Component } from '@angular/core';
import { Header } from '../../../components/header/header';
import { Footer } from '../../../components/footer/footer';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-comida',
  imports: [Header,Footer],
  templateUrl: './comida.html',
  styleUrl: './comida.css'
})
export class Comida {

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

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id_comida'));
    this.comida = this.comidas.find(comida => comida.id_comida === id);
    if (!this.comida) {
      this.router.navigate(['/error']);;
    }
  }

  goToResenaComida() {
    this.router.navigate(['/resenas', this.comida.id_comida,]);
  }

  goToConfirmarPedido(){
    this.router.navigate(['/pedido',this.comida.id_comida,'confirmar'])
  }

}
