import { Component } from '@angular/core';
import { Header } from '../../../components/header/header';
import { Footer } from '../../../components/footer/footer';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
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

  id_comida!: number;
  nombre_comida!: string;

  constructor(
    private route: ActivatedRoute,
    public router: Router, 
    private location: Location,
    private formBuilder: FormBuilder,
    private resenaSvc: ResenasSvc,
  ) {

    const id_comida = this.route.snapshot.paramMap.get('id_comida');
    const nombre_comida = this.route.snapshot.paramMap.get('nombre_comida');

    if (id_comida && nombre_comida) {
      this.id_comida = Number(id_comida);
      this.nombre_comida = nombre_comida;
      console.log('Datos recibidos desde URL:', { id_comida: this.id_comida, nombre_comida: this.nombre_comida });
    } else {
      console.log('Faltan parámetros en la URL');
      this.router.navigate(['/pedidos']);
    }

    this.resenaForm = this.formBuilder.group({
      id_usuario: [Number(localStorage.getItem('id_usuario')),[Validators.required]],
      nombre_comida_display: [this.nombre_comida,[Validators.required]],
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
          type: 'text', 
          name: 'comida',
          formControlName: "nombre_comida_display",
          value: this.nombre_comida,
          placeholder: this.nombre_comida,
          required: true,
          readonly: true
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
          type: 'textarea',
          formControlName: "comentario",
          name: 'comentario',
          value: '',
          placeholder: "Escribe tu comentario sobre la comida...",
          required: true 
        },
      ]
    };

    this.crearResena = this.crearResena.bind(this);
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
      id_comida: this.id_comida,
      comentario: formData.comentario,
      calificacion: Number(formData.calificacion),
    }).subscribe({
      next: (res) => {
        console.log('Comida creada exitosamente:', res);
        alert('Comida creada exitosamente');
        this.router.navigate(['/resenas']);
      },
      error: (err) => {
        console.error('Error al crear comida:', err);
        alert('Error al crear comida');
      }
    });
    
  }

}
