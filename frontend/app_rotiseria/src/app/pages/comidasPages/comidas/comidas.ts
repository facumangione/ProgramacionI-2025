import { Component } from '@angular/core';
import { Header } from '../../../components/header/header';
import { Footer } from '../../../components/footer/footer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comidas',
  imports: [Header,Footer],
  templateUrl: './comidas.html',
  styleUrl: './comidas.css'
})
export class Comidas {

  comidas=[
    {
      id_comida:1,
      nombre: 'Spaghetti a la Fileto',
      descripcion:'Al estilo italiano',
      precio: 1500,
      image: 'assets/spaghetti.jpg',
    },
    {
      id_comida:2,
      nombre: 'Lasagna',
      descripcion:'Con Salsa Boloñesa',
      precio: 1600,
      image: 'assets/lasagna.jpg',
    },
    {
      id_comida:3,
      nombre: 'Ñoquis a la sazón',
      descripcion:'Con Yogur y Panceta',
      precio: 1800,
      image: 'assets/noquis.jpg'
    } 
  ]

  constructor(private router: Router) {}

  //Deberia hacer delete de la comida
  eliminarComida(id_comida:any) {
    console.log("Comida eliminada")
    this.router.navigate(['/comidas']);
  }

  goToEditarComida(id_comida:any){
    console.log("redirigido a editar comida en:  /comida",id_comida,"editar" )
    this.router.navigate(['/comida',id_comida,'editar'])
  }

  goToCrearComida(){
    console.log("redirigido a crear comida")
    this.router.navigate(['/comidas/crear'])
  }

}
