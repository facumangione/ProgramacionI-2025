import { Component } from '@angular/core';
import { Header } from '../../../components/header/header';
import { Footer } from '../../../components/footer/footer';
import { Formulario } from '../../../components/formulario/formulario';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ComidasSvc } from '../../../services/comidas';
import { CategoriasSvc } from '../../../services/categorias';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-comida',
  imports: [Header, Footer, Formulario],
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
    private categoriasSvc: CategoriasSvc,
    private formBuilder: FormBuilder
  ) {
    this.comidaForm = this.formBuilder.group({
      nombre:         ['', [Validators.required]],
      descripcion:    ['', [Validators.required]],
      precio:         ['', [Validators.required]],
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
          title: 'Editar Comida',
          cancelRoute: this.goBack.bind(this),
          submitText: 'EDITAR COMIDA',
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
              placeholder: 'Selecciona una imagen (JPG)',
              required: false
            }
          ]
        };

        const id = Number(this.route.snapshot.paramMap.get('id_comida'));
        this.comidasSvc.getComidaById(id).subscribe({
          next: (res: any) => {
            console.log('Comida encontrada:', res);
            this.comida = res;
            this.comidaForm.patchValue({
              id_categoria: res.id_categoria
            });
          },
          error: (err) => {
            console.error('Error al traer comida:', err);
          }
        });
      }
    });

    this.editarComida = this.editarComida.bind(this);
  }

  goBack() {
    this.location.back();
  }

  editarComida() {
    const formData = this.comidaForm.value;
    const rol = localStorage.getItem('rol');

    if (rol === 'ADMIN') {
      this.adminPut(formData);
    } else if (rol === 'EMPLEADO') {
      this.empleadoPut(formData);
    } else {
      console.warn('No tiene permisos para editar la comida');
    }
  }

  adminPut(formData: any) {
    const archivoInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    const archivo = archivoInput?.files?.[0];

    const ejecutarPut = (imagenNombre: string) => {
      this.comidasSvc.putComida({
        nombre:         formData.nombre,
        descripcion:    formData.descripcion,
        precio:         Number(formData.precio),
        imagen:         imagenNombre,
        disponibilidad: formData.disponibilidad,
        stock:          Number(formData.stock),
        id_categoria:   formData.id_categoria
      }, this.comida.id_comida).subscribe({
        next: () => {
          alert('Comida editada exitosamente');
          this.router.navigate(['/comidas']);
        },
        error: (err) => {
          console.error('Error al editar comida:', err);
          alert('Error al editar comida');
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
          next: () => ejecutarPut(nombreSinExtension + '.jpg'),
          error: (err) => {
            console.error('Error subiendo imagen:', err);
            alert('Error al subir imagen');
          }
        });
      };
      reader.readAsDataURL(archivo);
    } else {
      ejecutarPut(this.comida.imagen || '');
    }
  }

  empleadoPut(formData: any) {
    this.comidasSvc.putComida({
      nombre:         this.comida.nombre,
      descripcion:    this.comida.descripcion,
      precio:         this.comida.precio,
      imagen:         this.comida.imagen,
      disponibilidad: formData.disponibilidad,
      stock:          this.comida.stock,
      id_categoria:   this.comida.id_categoria
    }, this.comida.id_comida).subscribe({
      next: () => {
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