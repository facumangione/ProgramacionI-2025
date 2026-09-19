import { Component } from '@angular/core';
import { Header } from '../../../components/header/header';
import { Footer } from '../../../components/footer/footer';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UsuariosSvc } from '../../../services/usuarios';

@Component({
  selector: 'app-usuarios',
  imports: [Header, Footer, FormsModule],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css'
})
export class Usuarios {

  nombreBuscado: string = '';
  rolBuscado: string = '';
  soloPendientes: boolean = false;
  usuarios: any[] = [];
  arrayFiltred = [...this.usuarios];

  currentPage = 1;
  perPage = 5;
  totalPages!: number;

  constructor(
    private router: Router,
    private usuariosSvc: UsuariosSvc
  ) {}

  ngOnInit() {
    this.cargarPagina(1);
  }

  private cargarPagina(page: number): void {
    const activoFiltro = this.soloPendientes ? false : undefined;

    this.usuariosSvc.getUsuarios(
      page,
      this.perPage,
      this.rolBuscado,
      this.nombreBuscado,
      activoFiltro
    ).subscribe({
      next: (res: any) => {
        console.log("Usuarios: ", res);
        this.usuarios = res.usuarios;
        this.arrayFiltred = [...this.usuarios];
        this.totalPages = Number(res.pages);
        this.currentPage = page;
      },
      error: (err) => {
        console.log("Error al traer usuarios: ", err);
      }
    });
  }

  filtrarUsuarios() {
    this.currentPage = 1;
    this.cargarPagina(1);
  }

  togglePendientes() {
    this.soloPendientes = !this.soloPendientes;
    this.currentPage = 1;
    this.cargarPagina(1);
  }

  limpiarFiltros() {
    this.nombreBuscado = '';
    this.rolBuscado = '';
    this.soloPendientes = false;
    this.currentPage = 1;
    this.cargarPagina(1);
  }

  activarUsuario(id_usuario: number) {
    this.usuariosSvc.activarUsuario(id_usuario).subscribe({
      next: () => {
        alert('Usuario activado exitosamente');
        this.cargarPagina(this.currentPage);
      },
      error: (err) => {
        console.error('Error al activar usuario:', err);
        alert('Error al activar usuario');
      }
    });
  }

  desbloquearUsuario(id_usuario: number) {
    this.usuariosSvc.desbloquearUsuario(id_usuario).subscribe({
      next: () => {
        alert('Usuario desbloqueado y cancelaciones reiniciadas');
        this.cargarPagina(this.currentPage);
      },
      error: (err) => {
        console.error('Error al desbloquear usuario:', err);
        alert('Error al desbloquear usuario');
      }
    });
  }

  eliminarUsuario(id_usuario: any) {
    this.usuariosSvc.deleteUsuario(id_usuario).subscribe({
      next: () => {
        this.cargarPagina(1);
      },
      error: (err) => {
        console.log("Error al eliminar usuario: ", err);
      }
    });
  }

  showDeleteButtons() {
    const rol = localStorage.getItem('rol');
    return rol === 'ADMIN';
  }

  goToEditarUsuario(id_usuario: any) {
    this.router.navigate(['/usuario', id_usuario, 'editar']);
  }

  goToCrearUsuario() {
    this.router.navigate(['/usuarios/crear']);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage = this.currentPage + 1;
      this.cargarPagina(this.currentPage);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage = this.currentPage - 1;
      this.cargarPagina(this.currentPage);
    }
  }
}