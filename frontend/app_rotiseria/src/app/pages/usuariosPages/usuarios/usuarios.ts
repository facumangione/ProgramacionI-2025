import { Component } from '@angular/core';
import { Header } from '../../../components/header/header';
import { Footer } from '../../../components/footer/footer';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UsuariosSvc } from '../../../services/usuarios';

@Component({
  selector: 'app-usuarios',
  imports: [Header,Footer,FormsModule],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css'
})
export class Usuarios {

  nombreBuscado: string = '';
  rolBuscado: string = '';
  usuarios:any[]=[];
  arrayFiltred=[...this.usuarios]

  currentPage = 1;
  perPage = 5;
  totalPages!: number;

  constructor(
    private router: Router,
    private usuariosSvc: UsuariosSvc
  ){}

  ngOnInit(){
    this.cargarPagina(1);
  }

  private cargarPagina(page: number): void {

    console.log('Filtros aplicados:', { nombre: this.nombreBuscado, rol: this.rolBuscado });

    this.usuariosSvc.getUsuarios(
      page, 
      this.perPage,
      this.rolBuscado,
      this.nombreBuscado
    ).subscribe({
      next: (res:any)=>{
        console.log("Usuarios: ",res);
        this.usuarios=res.usuarios;
        this.arrayFiltred=[...this.usuarios]
        this.totalPages = Number(res.pages)
        this.currentPage = page;
      },
      error: (err)=>{
        console.log("Error al traer usuarios: ",err)
      }
    })
  }

  filtrarUsuarios(){
    console.log('Filtrando usuarios con:', { 
      nombre: this.nombreBuscado, 
      rol: this.rolBuscado 
    });
    this.currentPage = 1;
    this.cargarPagina(1);
  }

  limpiarFiltros() {
    this.nombreBuscado = '';
    this.rolBuscado = '';
    this.currentPage = 1;
    this.cargarPagina(1);
  }

  eliminarUsuario(id_usuario:any) {
    this.usuariosSvc.deleteUsuario(id_usuario).subscribe({
      next: (res:any)=>{
        console.log("Usuario eliminado: ",res);
      },
      error: (err)=>{
        console.log("Error al eliminar usuario: ",err)
      }
    })
    this.router.navigate(['/usuarios']);
  }

  goToEditarUsuario(id_usuario:any){
    console.log("redirigido a editar usuario en:  /usuario",id_usuario,"editar" )
    this.router.navigate(['/usuario',id_usuario,'editar'])
  }

  goToCrearUsuario(){
    console.log("redirigido a crear usuario")
    this.router.navigate(['/usuarios/crear'])
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
