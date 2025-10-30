import { Component } from '@angular/core';
import { Header } from '../../../components/header/header';
import { Footer } from '../../../components/footer/footer';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ComidasSvc } from '../../../services/comidas';

@Component({
  selector: 'app-comida',
  imports: [Header,Footer],
  templateUrl: './comida.html',
  styleUrl: './comida.css'
})
export class Comida {

  comida: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private comidasSvc: ComidasSvc) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id_comida'));
    this.comidasSvc.getComidaById(id).subscribe({
    next: (res) => {
      console.log('Comida encontrada:', res);
      this.comida = {
        ...res,
        image: `assets/${res.nombre.toLowerCase()}.jpg`,
        alt: res.nombre
      };
    },
    error: (err) => {
      console.error('Error al traer comida:', err);
    }
  });
  }

  goToResenaComida() {
    this.router.navigate(['/resenas', this.comida.id_comida,]);
  }

  goToConfirmarPedido(){
    this.router.navigate(['/pedido',this.comida.id_comida,'confirmar'])
  }

}
