import { Component } from '@angular/core';
import { Header } from '../../../components/header/header';
import { Footer } from '../../../components/footer/footer';
import { Formulario } from '../../../components/formulario/formulario';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComidasSvc } from '../../../services/comidas';
import { CategoriasSvc } from '../../../services/categorias';

@Component({
  selector: 'app-crear-comida',
  imports: [Header, Footer, Formulario],
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
    private comidasSvc: ComidasSvc,
    private categoriasSvc: CategoriasSvc
  ) {
    this.comidaForm = this.formBuilder.group({
      nombre:         ['', [Validators.required]],
      descripcion:    ['', [Validators.required]],
      precio:         [null, [Validators.required]],
      disponibilidad: [false, [Validators.required]],
      stock:          [0, [Validators.required, Validators.min(0)]],
      id_categoria:   [null],
      imagen:         ['']
    });
  }

  ngOnInit() {
    this.categoriasSvc.getCategorias().subscribe({
      next: (res: any) => {
        const opcionesCategoria = res.categorias.map((cat: any) => ({
          value: cat.id_categoria,
          label: cat.nombre
        }));

        this.formConfig = {
          title: 'Crear Comida',
          cancelRoute: this.goBack.bind(this),
          submitText: 'CREAR COMIDA',
          formGroup: this.comidaForm,
          fields: [
            {
              label: 'Nombre:',
              type: 'text',
              formControlName: 'nombre',
              name: 'nombre',
              value: '',
              placeholder: 'Nombre de la comida...',
              required: true
            },
            {
              label: 'Descripción:',
              type: 'text',
              formControlName: 'descripcion',
              name: 'descripcion',
              value: '',
              placeholder: 'Describe la comida...',
              required: true
            },
            {
              label: 'Precio:',
              type: 'number',
              formControlName: 'precio',
              name: 'precio',
              value: '',
              placeholder: '0',
              required: true
            },
            {
              label: 'Stock:',
              type: 'number',
              formControlName: 'stock',
              name: 'stock',
              value: '',
              placeholder: '0',
              required: true
            },
            {
              label: 'Categoría:',
              type: 'select',
              formControlName: 'id_categoria',
              name: 'id_categoria',
              options: opcionesCategoria
            },
            {
              label: 'Disponibilidad:',
              type: 'select',
              formControlName: 'disponibilidad',
              name: 'disponibilidad',
              options: [
                { value: false, label: 'NO DISPONIBLE' },
                { value: true,  label: 'DISPONIBLE' }
              ]
            },
            {
              label: 'Imagen:',
              type: 'file',
              formControlName: 'imagen',
              name: 'imagen',
              value: '',
              placeholder: 'Selecciona una imagen para el producto',
              required: true
            }
          ]
        };
      }
    });

    this.crearComida = this.crearComida.bind(this);
  }

  goBack() {
    this.location.back();
  }

  crearComida() {
    if (this.comidaForm.invalid) {
      alert('Por favor complete todos los campos correctamente');
      return;
    }

    const formData = this.comidaForm.value;
    const archivoInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    const archivo = archivoInput?.files?.[0];

    const ejecutarPost = (imagenNombre: string) => {
      this.comidasSvc.postComida({
        nombre:         formData.nombre,
        descripcion:    formData.descripcion,
        precio:         Number(formData.precio),
        disponibilidad: formData.disponibilidad,
        stock:          Number(formData.stock),
        id_categoria:   formData.id_categoria,
        imagen:         imagenNombre
      }).subscribe({
        next: () => {
          alert('Comida creada exitosamente');
          this.router.navigate(['/comidas']);
        },
        error: (err) => {
          console.error('Error al crear comida:', err);
          alert('Error al crear comida');
        }
      });
    };

    if (archivo) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = (reader.result as string).split(',')[1];
        const nombreSinExtension = formData.nombre.toLowerCase();

        this.comidasSvc.subirImagen({
          nombre:        nombreSinExtension,
          imagen_base64: base64
        }).subscribe({
          next: () => ejecutarPost(nombreSinExtension + '.jpg'),
          error: (err) => {
            console.error('Error subiendo imagen:', err);
            alert('Error al subir imagen');
          }
        });
      };
      reader.readAsDataURL(archivo);
    } else {
      ejecutarPost('');
    }
  }
}