import { Component } from '@angular/core';
import { Header } from '../../../components/header/header';
import { Footer } from '../../../components/footer/footer';
import { Formulario } from '../../../components/formulario/formulario';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-editar-comida',
  imports: [Header,Footer,Formulario],
  templateUrl: './editar-comida.html',
  styleUrl: './editar-comida.css'
})
export class EditarComida {
  
  comida={
      id_comida:1,
      nombre: 'Spaghetti a la Fileto',
      descripcion:'Al estilo italiano',
      precio: 1500,
      image: 'assets/spaghetti.jpg',
      alt:'Spaghetti a la Fileto'
    }

    formConfig: any;

  constructor(private route: ActivatedRoute,public router: Router, private location: Location) {}

  ngOnInit() {

    this.formConfig = {
      title: 'Editar Comida',
      cancelRoute: this.goBack.bind(this),
      submitText: 'EDITAR COMIDA',
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
          placeholder: "Selecciona una imagen para el producto (JPG, PNG)",
          required: true 
        },
        
      ]
    };

    this.editarComida=this.editarComida.bind(this);

  }

  goBack() {
    this.location.back(); 
  }

  //Deberia realizar el PUT, en el estado de ahora no trae los campos ingresados
  editarComida(fields: any){
    console.log('Comida actualizado:', this.comida.id_comida);
    this.router.navigate(['/comidas']);
  }

}

