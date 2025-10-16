import { Component } from '@angular/core';
import { Header } from '../../../components/header/header';
import { Footer } from '../../../components/footer/footer';
import { Router } from '@angular/router';
import { ComidasSvc } from '../../../services/comidas';

@Component({
  selector: 'app-comidas',
  imports: [Header,Footer],
  templateUrl: './comidas.html',
  styleUrl: './comidas.css'
})
export class Comidas {

  comidas:any[]=[];

  constructor(private router: Router,private comidasSvc: ComidasSvc) {}

  ngOnInit(){
    this.comidasSvc.getComidas().subscribe({
      next: (res:any)=>{
        console.log("Comidas: ",res);
        this.comidas=res.comidas; 
      }, 
      error: (err)=>{ 
        console.log("Error al traer comidas: ",err) 
      } 
    }) 
  }

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
