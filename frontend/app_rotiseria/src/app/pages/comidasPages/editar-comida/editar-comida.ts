import { Component } from '@angular/core';
import { Header } from '../../../components/header/header';
import { Footer } from '../../../components/footer/footer';
import { Formulario } from '../../../components/formulario/formulario';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ComidasSvc } from '../../../services/comidas';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-comida',
  imports: [Header,Footer,Formulario],
  templateUrl: './editar-comida.html',
  styleUrl: './editar-comida.css'
})
export class EditarComida {
  
  comida: any;
  formConfig: any;
  comidaForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    public router: Router, 
    private location: Location, 
    private comidasSvc: ComidasSvc,
    private formBuilder: FormBuilder
  ) {
    this.comidaForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      precio: ['', [Validators.required]],
      disponibilidad: [false, [Validators.required]],
      imagen: ['']
    })
  }

  ngOnInit() {
    this.formConfig = {
      title: 'Editar Comida',
      cancelRoute: this.goBack.bind(this),
      submitText: 'EDITAR COMIDA',
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
        { 
          label: 'Disponibilidad:', 
          type: 'select', 
          formControlName: "disponibilidad",
          name: 'disponibilidad',
          options: [
            { value: false, label: 'NO DISPONIBLE' },
            { value: true, label: 'DISPONIBLE' },
          ]
        },
        { label: 'Imagen:',
          type: 'file',
          formControlName: "imagen",
          name: 'imagen',
          value: '',
          placeholder: "Selecciona una imagen para el producto (en formato JPG y en minuscula)",
          required: false
        },
        
      ]
    };

    this.editarComida=this.editarComida.bind(this);

    const id = Number(this.route.snapshot.paramMap.get('id_comida'));
    this.comidasSvc.getComidaById(id).subscribe({
    next: (res) => {
      console.log('Comida encontrada:', res);
      this.comida = res;
    },error: (err) => {
      console.error('Error al traer comida:', err);
    }
    });
  }

  goBack() {
    this.location.back(); 
  }

  editarComida(){

    const formData = this.comidaForm.value;
    const rol = localStorage.getItem('rol')

    if (rol === 'ADMIN'){
      this.adminPut(formData)
    } else if (rol === 'EMPLEADO'){
      this.empleadoPut(formData)
    } else {
      console.warn('No tiene permisos para editar la comida');
    }
  }

  adminPut(formData:any){
    this.comidasSvc.putComida({
      nombre: formData.nombre,
      descripcion: formData.descripcion,
      precio: Number(formData.precio),
      imagen: formData.imagen,
      disponibilidad: formData.disponibilidad
      },
      this.comida.id_comida
    ).subscribe({
      next: (res) => {
        console.log('Comida editada exitosamente:', res);
        alert('Comida editada exitosamente');
        this.router.navigate(['/comidas']);
      },
      error: (err) => {
        console.error('Error al editar comida:', err);
        alert('Error al editar comida');
      }
    });
  }

  empleadoPut(formData:any){
    this.comidasSvc.putComida({
      nombre: this.comida.nombre,
      descripcion: this.comida.descripcion,
      precio: this.comida.precio,
      imagen: this.comida.imagen,
      disponibilidad: formData.disponibilidad
      },
      this.comida.id_comida
    ).subscribe({
      next: (res) => {
        console.log('Comida editada exitosamente:', res);
        alert('Comida editada exitosamente');
        this.router.navigate(['/comidas']);
      },
      error: (err) => {
        console.error('Error al editar comida:', err);
        alert('Error al editar comida');
      }
    });
  }
}

