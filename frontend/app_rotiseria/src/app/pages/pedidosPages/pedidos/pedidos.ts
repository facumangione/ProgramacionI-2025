import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Header } from '../../../components/header/header';
import { Footer } from '../../../components/footer/footer';
import { PedidosSvc } from '../../../services/pedidos-svc';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pedidos',
  imports: [Header,Footer,FormsModule],
  templateUrl: './pedidos.html',
  styleUrl: './pedidos.css'
})
export class Pedidos {

  pedidos:any[]=[];
  arrayFiltred=[...this.pedidos];
  idBuscado!: number;
  estadoBuscado: any = '';
  idPedidoBuscado: any = '';

  currentPage = 1;
  perPage = 5;
  totalPages!: number;

  constructor(
    private router: Router, 
    private pedidosSvc:PedidosSvc
  ) {}

  ngOnInit(){
    this.cargarPagina(1);
  }

  private cargarPagina(page: number): void {
    const rol = localStorage.getItem('rol');
    const id_usuario = localStorage.getItem('id_usuario');
    this.currentPage = page;

    if (rol === 'ADMIN') {
      this.cargarTodosPedidos(page);
    } else if (rol === 'CLIENTE' && id_usuario) {
      this.cargarPedidosUsuario(Number(id_usuario), page);
    }
  }

  private cargarTodosPedidos(page: number): void {

    this.pedidosSvc.getPedidos(
      page, 
      this.perPage,
      this.estadoBuscado,
      this.idPedidoBuscado
    ).subscribe({
      next: (res: any) => {
        console.log('Pedidos:', res);
        this.pedidos = res.pedidos;
        this.arrayFiltred = [...this.pedidos];
        this.totalPages = Number(res.pages)
        this.currentPage = page;
      },
      error: (err) => {
        console.log('Error al traer pedidos:', err);
      }
    });
  }

  private cargarPedidosUsuario(id_usuario: number,page: any): void {
    this.pedidosSvc.getPedidosByUsuario(
      id_usuario,
      page,
      this.perPage,
      this.estadoBuscado,
      this.idPedidoBuscado
    ).subscribe({
      next: (res: any) => {
        console.log('Pedidos del usuario:', res);
        this.pedidos = res.pedidos;
        this.totalPages = Number(res.pages)
        this.arrayFiltred = [...this.pedidos];
      },
      error: (err) => {
        console.log('Error al traer pedidos del usuario:', err);
      }
    });
  }

  getComida(pedido: any): string {
    if (!pedido.comidas || pedido.comidas.length === 0) {
      return 'Sin comidas';
    }
    return pedido.comidas.map((c: any) => c.nombre).join(', ');
  }

  filtrarPedidos() {
    console.log('Filtrando usuarios con:', { 
      nombre: this.estadoBuscado, 
      rol: this.idPedidoBuscado
    });
    this.currentPage = 1;
    this.cargarPagina(1);
  }

  limpiarFiltros() {
    this.estadoBuscado = '';
    this.idPedidoBuscado = '';
    this.currentPage = 1;
    this.cargarPagina(1);
  }
  
  getRol(){
    return localStorage.getItem('rol');
  }

  eliminarPedido(id_pedido:any) {
    this.pedidosSvc.deletePedido(id_pedido).subscribe({
      next: (res:any)=>{
        console.log("Pedido eliminado: ",res);
      },
      error: (err)=>{
        console.log("Error al eliminar pedido: ",err)
      }
    })
    window.location.reload();
  }

  goToEditarPedido(id_pedido:any){
    console.log("redirigido a editar comida en:  /comida",id_pedido,"editar" )
    this.router.navigate(['/pedido',id_pedido,'editar'])
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.cargarPagina(this.currentPage + 1);
    } else {
      return
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.cargarPagina(this.currentPage - 1);
    } else {
      return
    }
  }

}
