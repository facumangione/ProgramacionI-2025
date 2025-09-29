import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css'
})
export class ProductCard {
  @Input() comida: any;
  @Input() login: boolean = false

  constructor(private router: Router) {}

  goToComida() {
    this.router.navigate(['/comida', this.comida.id_comida]);
  }

  goToConfirmarPedido(){
    this.router.navigate(['/pedido',this.comida.id_comida,'confirmar'])
  }

}
