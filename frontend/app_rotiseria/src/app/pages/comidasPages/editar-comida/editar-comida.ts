import { Component } from '@angular/core';
import { Header } from '../../../components/header/header';
import { Footer } from '../../../components/footer/footer';
import { Formulario } from '../../../components/formulario/formulario';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ComidasSvc } from '../../../services/comidas';

@Component({
  selector: 'app-editar-comida',
  imports: [Header,Footer,Formulario],
  templateUrl: './editar-comida.html',
  styleUrl: './editar-comida.css'
})
export class EditarComida {
  
  comida: any;
  formConfig: any;

  constructor(private route: ActivatedRoute,public router: Router, private location: Location, private comidasSvc: ComidasSvc) {}

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
          placeholder: "Selecciona una imagen para el producto (en formato JPG y en minuscula)",
          required: true 
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

  //Deberia realizar el PUT, en el estado de ahora no trae los campos ingresados
  editarComida(fields: any){
    console.log('Comida actualizado:', this.comida.id_comida);
    this.router.navigate(['/comidas']);
  }

}

