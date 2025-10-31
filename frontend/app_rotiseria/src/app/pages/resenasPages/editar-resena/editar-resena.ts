import { Component } from '@angular/core';
import { Header } from '../../../components/header/header';
import { Footer } from '../../../components/footer/footer';
import { Formulario } from '../../../components/formulario/formulario';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ResenasSvc } from '../../../services/resenas-svc';
import { ComidasSvc } from '../../../services/comidas';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-resena',
  imports: [Header,Footer,Formulario],
  templateUrl: './editar-resena.html',
  styleUrl: './editar-resena.css'
})
export class EditarResena {

  formConfig: any;
  resena: any;
  resenaForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private location: Location,
    private resenasSvc: ResenasSvc,
    private comidaSvc: ComidasSvc,
    private formBuilder: FormBuilder,
  ) {
    this.resenaForm = this.formBuilder.group({
      id_usuario: [Number(localStorage.getItem('id_usuario')),[Validators.required]],
      id_comida: ['',[Validators.required]],
      comentario: ['', [Validators.required]],
      calificacion: [null, [Validators.required]]
    })
  }

  ngOnInit() {
    const id_resena = Number(this.route.snapshot.paramMap.get('id_resena')); 

    this.formConfig = {
      title: 'Editar Reseña',
      cancelRoute: this.goBack.bind(this),
      submitText: 'GUARDAR CAMBIOS',
      formGroup: this.resenaForm,
      fields: [
        {
          label: 'Comida:',
          type: 'text', 
          formControlName: "id_comida",
          name: 'nombre_comida',
          required: false,
          readonly: true,
        },
        { 
          label: 'Calificación:', 
          type: 'select', 
          formControlName: "calificacion",
          name: 'calificacion',
          options: [
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
          required: true
        },
      ]
    };

    this.editarResena=this.editarResena.bind(this);

    this.resenasSvc.getResenaById(id_resena).subscribe({
      next: (res) => {
        console.log('Reseña encontrada:', res);
        this.resena = res;

        this.comidaSvc.getComidaById(res.id_comida).subscribe({
          next: (comida: any) => {
            console.log('Comida asociada:', comida.nombre);
            this.resena = {
              ...this.resena,
              nombre_comida: comida.nombre
            };  
          },
          error: (err) => {
            console.error('Error al obtener la comida:', err);
            this.resena.nombre_comida = 'Comida no encontrada';
          },
        });
      },
      error: (err) => {
        console.error('Error al traer reseña:', err);
      },
    });

  }

  goBack() {
    this.location.back(); 
  }

  editarResena(){

    const formData = this.resenaForm.value;

    this.resenasSvc.putResena({
      id_usuario: this.resena.id_usuario,
      id_comida: Number(formData.id_comida),
      comentario: formData.comentario,
      calificacion: Number(formData.calificacion),
      },
      this.resena.id_resena
    ).subscribe({
      next: (res) => {
        console.log('Resena editada exitosamente:', res);
        alert('Resena editada exitosamente');
        this.router.navigate(['/resenas']);
      },
      error: (err) => {
        console.error('Error al editar resena:', err);
        alert('Error al editar resena');
      }
    });
  }

}