import { Component } from '@angular/core';
import { Header } from '../../../components/header/header';
import { Footer } from '../../../components/footer/footer';

@Component({
  selector: 'app-resumen-pedido',
  imports: [Header,Footer],
  templateUrl: './resumen-pedido.html',
  styleUrl: './resumen-pedido.css'
})
export class ResumenPedido {
  pedido={
    id_pedido:1,
    id_usuario:1,
    fecha:'12/4/25',
    estado:'EN PREPARACIÓN',
    total: 1500,
    comida:'Spaghetti a la Fileto'
  };
}
