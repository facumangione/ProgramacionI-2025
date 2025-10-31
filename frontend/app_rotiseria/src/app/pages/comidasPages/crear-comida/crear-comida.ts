import { Component } from '@angular/core';
import { Header } from '../../../components/header/header';
import { Footer } from '../../../components/footer/footer';
import { Formulario } from '../../../components/formulario/formulario';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComidasSvc } from '../../../services/comidas';

@Component({
  selector: 'app-crear-comida',
  imports: [Header,Footer,Formulario],
  templateUrl: './crear-comida.html',
  styleUrl: './crear-comida.css'
})
export class CrearComida {

  formConfig: any;
  comidaForm!: FormGroup;

  constructor(
    public router: Router, 
    private location: Location,
    private formBuilder: FormBuilder,
    private comidasSvc: ComidasSvc
  ) {
    this.comidaForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      precio: [null, [Validators.required]]
    })
  }

  ngOnInit() {

    this.formConfig = {
      title: 'Crear Comida',
      cancelRoute: this.goBack.bind(this),
      submitText: 'CREAR COMIDA',
      formGroup: this.comidaForm,
      fields: [
        { label: 'Nombre:',
          type: 'text',
          formControlName: "nombre",
          name: 'nombre',
          value: '',
          placeholder: "Nombre de la comida...",
          required: true 
        },
        { label: 'Descripción:',
          type: 'text',
          formControlName: "descripcion",
          name: 'descripcion',
          value: '',
          placeholder: "Describe la comida...",
          required: true 
        },
        { label: 'Precio:',
          type: 'number',
          formControlName: "precio",
          name: 'precio',
          value: '',
          placeholder: "0",
          required: true 
        },
        { label: 'Imagen:',
          type: 'file',
          name: 'imagen',
          value: '',
          placeholder: "Selecciona una imagen para el producto (colocar nombre con formato <nombre_comida_en_minuscula>.JPG",
          required: true 
        },
        
      ]
    };

    this.crearComida=this.crearComida.bind(this);

  }

  goBack() {
    this.location.back(); 
  }

  crearComida(){

    if (this.comidaForm.invalid) {
      console.error('Formulario inválido');
      alert('Por favor complete todos los campos correctamente');
      return;
    }

    const formData = this.comidaForm.value;

    this.comidasSvc.postComida({
      nombre: formData.nombre,
      descripcion: formData.descripcion,
      precio: Number(formData.precio),
    }).subscribe({
      next: (res) => {
        console.log('Comida creada exitosamente:', res);
        alert('Comida creada exitosamente');
        this.router.navigate(['/comidas']);
      },
      error: (err) => {
        console.error('Error al crear comida:', err);
        alert('Error al crear comida');
      }
    });

  }

}
