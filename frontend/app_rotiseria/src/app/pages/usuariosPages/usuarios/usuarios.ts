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

  nombreBuscado!: string;
  rolBuscado: string = 'null';
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
    this.usuariosSvc.getUsuarios(page, this.perPage).subscribe({
      next: (res:any)=>{
        console.log("Usuarios: ",res);
        this.usuarios=res.usuarios;
        this.totalPages = Number(res.pages)
        this.arrayFiltred=[...this.usuarios]
      },
      error: (err)=>{
        console.log("Error al traer usuarios: ",err)
      }
    })
  }

  filtrarUsuarios(){
    let nombreBuscado = this.nombreBuscado ? this.nombreBuscado.toLowerCase() : '';
    
    this.arrayFiltred = this.usuarios.filter(u => {
      let cumpleNombre = nombreBuscado === '' || u.nombre.toLowerCase().includes(nombreBuscado);
      let cumpleRol = this.rolBuscado === 'null' || u.rol === this.rolBuscado;
      return cumpleNombre && cumpleRol;
    });
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
