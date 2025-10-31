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
  estadoBuscado: string = 'null';

  constructor(private router: Router, private pedidosSvc:PedidosSvc) {}

  ngOnInit(){
    const rol = localStorage.getItem('rol');
    const id_usuario = localStorage.getItem('id_usuario');

    if (rol === 'ADMIN') {
      this.cargarTodosPedidos();
    } else if (rol === 'CLIENTE' && id_usuario) {
      this.cargarPedidosUsuario(Number(id_usuario));
    }
  }

  private cargarTodosPedidos(): void {
    this.pedidosSvc.getPedidos().subscribe({
      next: (res: any) => {
        console.log('Pedidos:', res);
        this.pedidos = res.pedidos;
        this.arrayFiltred = [...this.pedidos];
      },
      error: (err) => {
        console.log('Error al traer pedidos:', err);
      }
    });
  }

  private cargarPedidosUsuario(id_usuario: number): void {
    this.pedidosSvc.getPedidosByUsuario(id_usuario).subscribe({
      next: (res: any) => {
        console.log('Pedidos del usuario:', res);
        this.pedidos = res.pedidos;
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
    this.arrayFiltred = this.pedidos.filter(pedido => {
      let cumpleID = !this.idBuscado || pedido.id_pedido === Number(this.idBuscado);
      let cumpleEstado = this.estadoBuscado === 'null' || pedido.estado === this.estadoBuscado;
      return cumpleID && cumpleEstado;
    });
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
}
