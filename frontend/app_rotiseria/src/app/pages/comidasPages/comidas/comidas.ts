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

  currentPage = 1;
  perPage = 5;
  totalPages!: number;

  constructor(private router: Router,private comidasSvc: ComidasSvc) {}

  ngOnInit(){
     this.cargarPagina(1);
  }

  private cargarPagina(page: number): void {
    this.comidasSvc.getComidasPaginado(page, this.perPage).subscribe({
      next: (res:any)=>{
        console.log("Comidas: ",res);
        this.comidas=res.comidas; 
        this.totalPages = Number(res.pages)
      }, 
      error: (err)=>{ 
        console.log("Error al traer comidas: ",err) 
      } 
    })
  }

  eliminarComida(id_comida:any) {
    this.comidasSvc.deleteComida(id_comida).subscribe({
      next: (res:any)=>{
        console.log("Comida eliminada: ",res);
        this.cargarPagina(1);
      },
      error: (err)=>{
        console.log("Error al eliminar comida: ",err)
      }
    })
    ;
  }

  goToEditarComida(id_comida:any){
    console.log("redirigido a editar comida en:  /comida",id_comida,"editar" )
    this.router.navigate(['/comida',id_comida,'editar'])
  }

  goToCrearComida(){
    console.log("redirigido a crear comida")
    this.router.navigate(['/comidas/crear'])
  }

  showDeleteButton(){
    const rol=localStorage.getItem('rol')
    if (rol==='ADMIN'){
      return true
    } else{
      return false
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage= this.currentPage + 1
      this.cargarPagina(this.currentPage);
    } else {
      return
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage= this.currentPage - 1
      this.cargarPagina(this.currentPage);
    } else {
      return
    }
  }

}
