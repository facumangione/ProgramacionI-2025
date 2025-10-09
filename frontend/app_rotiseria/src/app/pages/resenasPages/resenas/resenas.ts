import { Component } from '@angular/core';
import { Header } from '../../../components/header/header';
import { Footer } from '../../../components/footer/footer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resenas',
  imports: [Header,Footer],
  templateUrl: './resenas.html',
  styleUrl: './resenas.css'
})
export class Resenas {

  resenas=[
    {
      id_resena: 1,
      nombre_usuario:'Juan Pérez',
      comida: 'Spaghetti a la Fileto',
      calificacion: 5,
      comentario: 'Excelente'
    },
    {
      id_resena: 2,
      nombre_usuario:'Juan Pérez',
      comida: 'Lasagna',
      calificacion: 4,
      comentario: 'Muy buena'
    },
  ]

  constructor(private router: Router) {}

  //Deberia hacer delete de la reseña
  eliminarResena(id_resena:any) {
    console.log("reseña eliminada")
    this.router.navigate(['/resenas']);
  }

  goToEditarResena(id_resena:any){
    console.log("redirigido a editar reseña en:  /resena",id_resena,"editar" )
    this.router.navigate(['/resena',id_resena,'editar'])
  }

  goToCrearResena(){
    console.log("redirigido a crear reseña")
    this.router.navigate(['/resenas/crear'])
  }

  isUserAdmin(){
    const rol=localStorage.getItem('rol')
    if (rol==='ADMIN'){
      return true
    } else{
      return false
    }
  }

}
