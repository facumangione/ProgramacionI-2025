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
            image: `http://127.0.0.1:7000/assets/${comida.nombre.toLowerCase()}.jpg`,
            alt: comida.nombre
          }));
        this.arrayFiltred=[...this.comidas]
      },
      error: (err)=>{
        console.log("Error al traer comidas: ",err)
      }
    })
  }

  buscar(textoBuscado:string){
    console.log('Home.buscar recibió:', textoBuscado);
    textoBuscado=textoBuscado.toLowerCase();
    this.arrayFiltred=this.comidas.filter(comida =>
      comida.nombre.toLowerCase().includes(textoBuscado) ||
      (comida.categoria && comida.categoria.toLowerCase().includes(textoBuscado))
    );
  }

}
