import { Component } from '@angular/core';
import { Footer } from '../../components/footer/footer';
import { Router, RouterLink } from '@angular/router';
import { Header } from '../../components/header/header';
import { ProductCard } from '../../components/product-card/product-card';

@Component({
  selector: 'app-home',
  imports: [Header,Footer,ProductCard],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  //login=false; //si no esta logeado
  login=true; //si esta logeado

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

  arrayFiltred=[...this.comidas]

  constructor(private router:Router,){}

  buscar(nombreBuscado:string){
    console.log('Home.buscar recibió:', nombreBuscado);
    nombreBuscado=nombreBuscado.toLowerCase();
    this.arrayFiltred=this.comidas.filter(u => u.nombre.toLowerCase().includes(nombreBuscado));
  }

}
