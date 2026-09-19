import { Component } from '@angular/core';
import { Header } from '../../../components/header/header';
import { Footer } from '../../../components/footer/footer';
import { Formulario } from '../../../components/formulario/formulario';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PromocionesSvc } from '../../../services/promociones';
import { ComidasSvc } from '../../../services/comidas';

@Component({
  selector: 'app-crear-promocion',
  imports: [Header, Footer, Formulario],
  templateUrl: './crear-promocion.html',
  styleUrl: './crear-promocion.css'
})
export class CrearPromocion {

  formConfig: any;
  promocionForm!: FormGroup;

  constructor(
    public router: Router,
    private location: Location,
    private formBuilder: FormBuilder,
    private promocionesSvc: PromocionesSvc,
    private comidasSvc: ComidasSvc
  ) {
    // FormGroup: agrupa los FormControl de cada campo. Cada array es
    // [valorInicial, [validadores]] -> lo consume Reactive Forms.
    this.promocionForm = this.formBuilder.group({
      titulo: ['', [Validators.required]],
      descripcion: [''],
      porcentaje_descuento: [null, [Validators.required, Validators.min(1), Validators.max(100)]],
      id_comida: [null, [Validators.required]],
      fecha_fin: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    // El select de comidas necesita las opciones cargadas dinámicamente
    // desde el backend, igual que hicimos con categorías en crear-comida.
    this.comidasSvc.getComidas().subscribe({
      next: (res: any) => {
        const opcionesComida = res.comidas.map((c: any) => ({
          value: c.id_comida,
          label: c.nombre
        }));

        this.formConfig = {
          title: 'Crear Promoción',
          cancelRoute: this.goBack.bind(this),
          submitText: 'CREAR PROMOCIÓN',
          formGroup: this.promocionForm,
          fields: [
            { label: 'Título:', type: 'text', formControlName: 'titulo', name: 'titulo', placeholder: 'Ej: 2x1 en pizzas', required: true },
            { label: 'Descripción:', type: 'text', formControlName: 'descripcion', name: 'descripcion', placeholder: 'Detalle de la promo', required: false },
            { label: 'Descuento (%):', type: 'number', formControlName: 'porcentaje_descuento', name: 'porcentaje_descuento', placeholder: '0-100', required: true },
            { label: 'Comida:', type: 'select', formControlName: 'id_comida', name: 'id_comida', options: opcionesComida },
            { label: 'Vigente hasta (dd-mm-aaaa):', type: 'text', formControlName: 'fecha_fin', name: 'fecha_fin', placeholder: '31-12-2026', required: true }
          ]
        };
      }
    });

    this.crearPromocion = this.crearPromocion.bind(this);
  }

  goBack() {
    this.location.back();
  }

  crearPromocion() {
    if (this.promocionForm.invalid) {
      alert('Por favor complete todos los campos correctamente');
      return;
    }

    const formData = this.promocionForm.value;

    this.promocionesSvc.postPromocion({
      titulo: formData.titulo,
      descripcion: formData.descripcion,
      porcentaje_descuento: Number(formData.porcentaje_descuento),
      id_comida: formData.id_comida,
      fecha_fin: formData.fecha_fin
    }).subscribe({
      next: () => {
        alert('Promoción creada exitosamente');
        this.router.navigate(['/promociones']);
      },
      error: (err) => {
        console.error('Error al crear promoción:', err);
        const mensaje = err.error?.error || 'Error al crear promoción';
        alert(mensaje);
      }
    });
  }
}

