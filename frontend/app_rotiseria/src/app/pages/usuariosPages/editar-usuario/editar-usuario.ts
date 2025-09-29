import { Component } from '@angular/core';
import { Header } from '../../../components/header/header';
import { Footer } from '../../../components/footer/footer';
import { Formulario } from '../../../components/formulario/formulario';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-usuario',
  imports: [Header,Footer,Formulario],
  templateUrl: './editar-usuario.html',
  styleUrl: './editar-usuario.css'
})
export class EditarUsuario {

  usuario={
      id_usuario:1,
      nombre:'Ignacio Milutin',
      mail:'i.milutin@alumno.um.edu.ar',
      password:'1234',
      telefono:26164579875,
      rol:'ADMIN'
    }

  formConfig: any;

  constructor(private route: ActivatedRoute,public router: Router, private location: Location) {}

  ngOnInit() {
    this.formConfig = {
      title: 'Editar Usuario',
      cancelRoute: this.goBack.bind(this),
      submitText: 'EDITAR USUARIO',
      fields: [
        { label: 'Nombre Y Apellido:',
          type: 'text',
          name: 'nombre',
          value: '',
          placeholder: "Nombre y apellido completo...",
          required: true 
        },
        { label: 'Teléfono:',
          type: 'text',
          name: 'telefono',
          value: '',
          placeholder: "Teléfono...",
          required: true 
        },
        { label: 'Mail:',
          type: 'text',
          name: 'mail',
          value: '',
          placeholder: "usuario@ejemplo.com",
          required: true 
        },
        { 
          label: 'Rol:', 
          type: 'select', 
          name: 'rol',
          value: null,
          required: true,
          options: [
            { value: null, label: 'Seleccionar rol...',disabled: true },
            { value: "CLIENTE", label: "CLIENTE" },
            { value: "ADMIN", label: "ADMIN" },
          ]
        },
      ]
    };

    this.editarUsuario=this.editarUsuario.bind(this);

  }

  goBack() {
    this.location.back(); 
  }

  //Deberia realizar el PUT, en el estado de ahora no trae los campos ingresados
  editarUsuario(fields: any){
    console.log('Usuario actualizado:', this.usuario.id_usuario);
    this.router.navigate(['/resenas']);
  }

}
