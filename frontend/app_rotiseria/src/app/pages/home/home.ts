import { Component } from '@angular/core';
import { Footer } from '../../components/footer/footer';
import { Router, RouterLink } from '@angular/router';
import { Header } from '../../components/header/header';
import { ProductCard } from '../../components/product-card/product-card';
import { ComidasSvc } from '../../services/comidas';

@Component({
  selector: 'app-home',
  imports: [Header,Footer,ProductCard],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  comidas:any[]=[];
  arrayFiltred=[...this.comidas];

  constructor(private router:Router,private comidasSvc: ComidasSvc){}

  ngOnInit(){
    this.comidasSvc.getComidas().subscribe({
      next: (res:any)=>{
        console.log("Comidas: ",res);
        this.comidas = res.comidas
          .filter((comida: any) => comida.disponibilidad === true)
          .map((comida: any) => ({
            ...comida,
            image: `assets/${comida.nombre.toLowerCase()}.jpg`,
            alt: comida.nombre
          }));
        this.arrayFiltred=[...this.comidas]
      },
      error: (err)=>{
        console.log("Error al traer comidas: ",err)
      }
    })
  }

  buscar(nombreBuscado:string){
    console.log('Home.buscar recibió:', nombreBuscado);
    nombreBuscado=nombreBuscado.toLowerCase();
    this.arrayFiltred=this.comidas.filter(u => u.nombre.toLowerCase().includes(nombreBuscado));
  }

}
