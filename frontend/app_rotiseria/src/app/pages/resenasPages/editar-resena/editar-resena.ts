import { Component } from '@angular/core';
import { Header } from '../../../components/header/header';
import { Footer } from '../../../components/footer/footer';
import { Formulario } from '../../../components/formulario/formulario';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-editar-resena',
  imports: [Header,Footer,Formulario],
  templateUrl: './editar-resena.html',
  styleUrl: './editar-resena.css'
})
export class EditarResena {

  resena={
      id_resena: 1,
      nombre_usuario:'Juan Pérez',
      comida: 'Spaghetti a la Fileto',
      calificacion: 5,
      comentario: 'Excelente'
    }

  formConfig: any;

  constructor(private route: ActivatedRoute,public router: Router, private location: Location) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id_resena'); 

    this.formConfig = {
      title: 'Editar Reseña',
      cancelRoute: this.goBack.bind(this),
      submitText: 'GUARDAR CAMBIOS',
      fields: [
        { 
          label: 'Comida:', 
          type: 'select', 
          name: 'comida',
          options: [
            { value: 'Spaghetti a la Fileto', label: 'Spaghetti a la Fileto' },
            { value: 'Lasagna', label: 'Lasagna' },
            { value: 'Ñoquis a la sazón', label: 'Ñoquis a la sazón' }
          ]
        },
        { 
          label: 'Calificación:', 
          type: 'select', 
          name: 'calificacion',
          options: [
            { value: 1, label: '1 - Muy malo' },
            { value: 2, label: '2 - Malo' },
            { value: 3, label: '3 - Regular' },
            { value: 4, label: '4 - Bueno' },
            { value: 5, label: '5 - Excelente' }
          ]
        },
        { label: 'Comentario:', type: 'text', name: 'comentario', required: true },
      ]
    };

    this.editarResena=this.editarResena.bind(this);

  }

  goBack() {
    this.location.back(); 
  }

  //Deberia realizar el PUT, en el estado de ahora no trae los campos ingresados
  editarResena(fields: any){
    console.log('Reseña actualizada:', this.resena.id_resena);
    //this.router.navigate(['/resenas', this.resena.id_resena]);
  }

}
