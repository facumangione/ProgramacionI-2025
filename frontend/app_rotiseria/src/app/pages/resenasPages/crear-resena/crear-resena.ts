import { Component } from '@angular/core';
import { Header } from '../../../components/header/header';
import { Footer } from '../../../components/footer/footer';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Formulario } from '../../../components/formulario/formulario';

@Component({
  selector: 'app-crear-resena',
  imports: [Header,Footer,Formulario],
  templateUrl: './crear-resena.html',
  styleUrl: './crear-resena.css'
})
export class CrearResena {
  
  formConfig: any;

  constructor(public router: Router, private location: Location) {}

  ngOnInit() {

    this.formConfig = {
      title: 'Crear Reseña',
      cancelRoute: this.goBack.bind(this),
      submitText: 'CREAR RESEÑA',
      fields: [
        { 
          label: 'Comida:', 
          type: 'select', 
          name: 'comida',
          value: null,
          required: true,
          options: [
            { value: null, label: 'Seleccionar comida...',disabled: true },
            { value: 'Spaghetti a la Fileto', label: 'Spaghetti a la Fileto' },
            { value: 'Lasagna', label: 'Lasagna' },
            { value: 'Ñoquis a la sazón', label: 'Ñoquis a la sazón' }
          ]
        },
        { 
          label: 'Calificación:', 
          type: 'select', 
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
          name: 'comentario',
          value: '',
          placeholder: "Escribe tu comentario sobre la comida...",
          required: true 
        },
      ]
    };

    this.crearResena=this.crearResena.bind(this);

  }

  goBack() {
    this.location.back(); 
  }

  //Deberia realizar el POST
  crearResena(){
    console.log('reseña creada:');
    this.router.navigate(['/resenas']);
  }

}
