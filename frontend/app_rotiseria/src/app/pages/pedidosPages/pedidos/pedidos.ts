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
  idBuscado: any = '';
  estadoBuscado: any = '';

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

    if (rol === 'ADMIN' || rol === 'EMPLEADO') {
      this.cargarTodosPedidos(page);
    } else if (rol === 'CLIENTE' && id_usuario) {
      this.cargarPedidosUsuario(Number(id_usuario), page);
    }
  }

  private cargarTodosPedidos(page: number): void {

    const idBuscado = this.idBuscado || '';

    this.pedidosSvc.getPedidos(
      page, 
      this.perPage,
      this.estadoBuscado,
      idBuscado
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

    const idBuscado = this.idBuscado || '';
    
    this.pedidosSvc.getPedidosByUsuario(
      id_usuario,
      this.estadoBuscado,
      idBuscado,
      page,
      this.perPage,
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
    console.log('Filtrando pedidos con:', { 
      id_pedido: this.idBuscado,
      estado: this.estadoBuscado
    });
    this.currentPage = 1;
    this.cargarPagina(1);
  }

  limpiarFiltros() {
    this.estadoBuscado = '';
    this.idBuscado = null;
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
        this.cargarPagina(1);
      },
      error: (err)=>{
        console.log("Error al eliminar pedido: ",err)
      }
    })
    
  }

  goToEditarPedido(id_pedido:any){
    console.log("redirigido a editar comida en:  /comida",id_pedido,"editar" )
    this.router.navigate(['/pedido',id_pedido,'editar'])
  }

  goToCrearResena(pedido: any) {
    const comida = pedido.comidas[0];
    
    if (!comida) {
      alert('Este pedido no tiene comidas asociadas');
      return;
    }

    console.log("Redirigiendo a crear reseña con:", {
      nombre: comida.nombre
    });

    this.router.navigate(['/resenas/crear', comida.id_comida, comida.nombre]);
  }

  showEditDeleteButtons(){
    const rol=localStorage.getItem('rol')
    if (rol==='ADMIN' || rol==='EMPLEADO'){
      return true
    } else{
      return false
    }
  }

  showResenarButton(id_usuario_pedido:number){
    const id = Number(localStorage.getItem('id_usuario'))
    if (id==id_usuario_pedido){
      return true
    } else{
      return false
    }
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
