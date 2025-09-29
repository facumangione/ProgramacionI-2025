import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Header } from '../../../components/header/header';
import { Footer } from '../../../components/footer/footer';

@Component({
  selector: 'app-pedidos',
  imports: [Header,Footer],
  templateUrl: './pedidos.html',
  styleUrl: './pedidos.css'
})
export class Pedidos {

  pedidos=[{
    id_pedido:1,
    id_usuario:1,
    fecha:'12/4/25',
    estado:'EN PREPARACIÓN',
    total: 1500,
    comida:'Spaghetti a la Fileto'
  },
  {
    id_pedido:2,
    id_usuario:2,
    fecha:'15/5/25',
    estado:'LISTO',
    total: 1300,
    comida:'Lasagna'
  },
  ];

  constructor(private router: Router) {}

  //Deberia hacer delete de la usuario
  eliminarPedido(id_pedido:any) {
    console.log("pedido eliminado")
    this.router.navigate(['/pedidos']);
  }

  goToEditarPedido(id_pedido:any){
    console.log("redirigido a editar comida en:  /comida",id_pedido,"editar" )
    this.router.navigate(['/pedido',id_pedido,'editar'])
  }
}
