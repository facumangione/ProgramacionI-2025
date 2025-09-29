import { Component } from '@angular/core';
import { Header } from '../../../components/header/header';
import { Footer } from '../../../components/footer/footer';
import { Formulario } from '../../../components/formulario/formulario';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-comida',
  imports: [Header,Footer,Formulario],
  templateUrl: './crear-comida.html',
  styleUrl: './crear-comida.css'
})
export class CrearComida {

  formConfig: any;

  constructor(public router: Router, private location: Location) {}

  ngOnInit() {

    this.formConfig = {
      title: 'Crear Comida',
      cancelRoute: this.goBack.bind(this),
      submitText: 'CREAR COMIDA',
      fields: [
        { label: 'Nombre:',
          type: 'text',
          name: 'nombre',
          value: '',
          placeholder: "Nombre de la comida...",
          required: true 
        },
        { label: 'Descripción:',
          type: 'text',
          name: 'descripcion',
          value: '',
          placeholder: "Describe la comida...",
          required: true 
        },
        { label: 'Precio:',
          type: 'number',
          name: 'precio',
          value: '',
          placeholder: "0",
          required: true 
        },
        { label: 'Imagen:',
          type: 'file',
          name: 'imagen',
          value: '',
          placeholder: "Selecciona una imagen para el producto (colocar nombre con formato<nombre_comida>.JPG/PNG)",
          required: true 
        },
        
      ]
    };

    this.crearComida=this.crearComida.bind(this);

  }

  goBack() {
    this.location.back(); 
  }

  //Deberia realizar el POST
  crearComida(){
    console.log('comida creado:');
    this.router.navigate(['/comidas']);
  }

}
