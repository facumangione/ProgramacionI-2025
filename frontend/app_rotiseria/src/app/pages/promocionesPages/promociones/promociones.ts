import { Component } from '@angular/core';
import { Header } from '../../../components/header/header';
import { Footer } from '../../../components/footer/footer';
import { Router } from '@angular/router';
import { PromocionesSvc } from '../../../services/promociones';

@Component({
  selector: 'app-promociones',
  imports: [Header, Footer],
  templateUrl: './promociones.html',
  styleUrl: './promociones.css'
})
export class Promociones {

  promociones: any[] = [];

  constructor(
    private router: Router,
    private promocionesSvc: PromocionesSvc
  ) {}

  // ngOnInit se ejecuta UNA vez, después de que el componente se monta
  // en el DOM. Es el lugar correcto para el fetch inicial de datos,
  // a diferencia del constructor que solo debe recibir inyecciones.
  ngOnInit() {
    this.cargarPromociones();
  }

  private cargarPromociones(): void {
    this.promocionesSvc.getPromociones().subscribe({
      next: (res: any) => {
        console.log('Promociones:', res);
        this.promociones = res.promociones;
      },
      error: (err) => {
        console.log('Error al traer promociones:', err);
      }
    });
  }

  eliminarPromocion(id_promocion: number) {
    if (!confirm('¿Seguro que querés eliminar esta promoción?')) return;

    this.promocionesSvc.deletePromocion(id_promocion).subscribe({
      next: () => {
        this.cargarPromociones();
      },
      error: (err) => {
        console.error('Error al eliminar promoción:', err);
        alert('Error al eliminar promoción');
      }
    });
  }

  // Control de UI: solo ADMIN ve los botones de gestión.
  // Esto es solo cosmético -> el backend es la verdadera barrera de
  // seguridad, esto solo evita mostrar botones que fallarían igual.
  showAdminButtons() {
    const rol = localStorage.getItem('rol');
    return rol === 'ADMIN';
  }

  goToCrearPromocion() {
    this.router.navigate(['/promociones/crear']);
  }
}


