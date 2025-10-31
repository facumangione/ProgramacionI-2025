import { Component } from '@angular/core';
import { Header } from '../../../components/header/header';
import { Footer } from '../../../components/footer/footer';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Formulario } from '../../../components/formulario/formulario';
import { ResenasSvc } from '../../../services/resenas-svc';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComidasSvc } from '../../../services/comidas';

@Component({
  selector: 'app-crear-resena',
  imports: [Header,Footer,Formulario],
  templateUrl: './crear-resena.html',
  styleUrl: './crear-resena.css'
})
export class CrearResena {
  
  formConfig: any;
  resenaForm!: FormGroup;

  constructor(
    public router: Router, 
    private location: Location,
    private formBuilder: FormBuilder,
    private resenaSvc: ResenasSvc,
    private comidasSvc: ComidasSvc
  ) {
    this.resenaForm = this.formBuilder.group({
      id_usuario: [Number(localStorage.getItem('id_usuario')),[Validators.required]],
      id_comida: ['',[Validators.required]],
      comentario: ['', [Validators.required]],
      calificacion: [null, [Validators.required]]
    })
  }

  ngOnInit() {

    this.formConfig = {
      title: 'Crear Reseña',
      cancelRoute: this.goBack.bind(this),
      submitText: 'CREAR RESEÑA',
      formGroup: this.resenaForm,
      fields: [
        { 
          label: 'Comida:', 
          type: 'select', 
          formControlName: "id_comida",
          name: 'comida',
          value: null,
          required: true,
          options: [
            { value: null, label: 'Cargando comidas...', disabled: true }
          ]
        },
        { 
          label: 'Calificación:', 
          type: 'select', 
          formControlName: "calificacion",
          name: 'calificacion',
          value: null,
          required: true,
          options: [
            { value: null, label: 'Seleccionar calificación...',disabled: true },
            { value: 1, label: '1 - Muy malo' },
            { value: 2, label: '2 - Malo' },
            { value: 3, label: '3 - Regular' },
            { value: 4, label: '4 - Bueno' },
            { value: 5, label: '5 - Excelente' }
          ]
        },
        { label: 'Comentario:',
          type: 'text',
          formControlName: "comentario",
          name: 'comentario',
          value: '',
          placeholder: "Escribe tu comentario sobre la comida...",
          required: true 
        },
      ]
    };

    this.crearResena = this.crearResena.bind(this);

    this.cargarComidas();

  }

  cargarComidas() {
    this.comidasSvc.getComidas().subscribe({
      next: (res: any) => {
        console.log('Comidas cargadas:', res);
        const comidaField = this.formConfig.fields.find(
          (field: any) => field.formControlName === 'id_comida'
        );

        if (comidaField) {
          comidaField.options = [
            { value: null, label: 'Seleccionar comida...', disabled: true },
            ...res.comidas.map((comida: any) => ({
              value: comida.id_comida,
              label: comida.nombre
            }))
          ];
          console.log('Opciones de comidas actualizadas:', comidaField.options);
        }
      },
      error: (err) => {
        console.error('Error al cargar comidas:', err);
        const comidaField = this.formConfig.fields.find(
          (field: any) => field.formControlName === 'id_comida'
        );
        if (comidaField) {
          comidaField.options = [
            { value: null, label: 'Error al cargar comidas', disabled: true }
          ];
        }
        alert('Error al cargar las comidas. Por favor intente nuevamente.');
      }
    });
  }


  goBack() {
    this.location.back(); 
  }

  crearResena(){

    if (this.resenaForm.invalid) {
      console.error('Formulario inválido');
      console.log(this.resenaForm.value);
      alert('Por favor complete todos los campos correctamente');
      return;
    }

    const formData = this.resenaForm.value;

    console.log(this.resenaForm.value);

    this.resenaSvc.postResena({
      id_usuario: Number(localStorage.getItem('id_usuario')),
      id_comida: Number(formData.id_comida),
      comentario: formData.comentario,
      calificacion: Number(formData.calificacion),
    }).subscribe({
      next: (res) => {
        console.log('Comida creada exitosamente:', res);
        alert('Comida creada exitosamente');
        this.router.navigate(['/resenas',formData.id_comida]);
      },
      error: (err) => {
        console.error('Error al crear comida:', err);
        alert('Error al crear comida');
      }
    });
    
  }

}
