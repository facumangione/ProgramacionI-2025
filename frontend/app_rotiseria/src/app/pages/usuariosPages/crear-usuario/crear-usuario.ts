import { Component } from '@angular/core';
import { Header } from '../../../components/header/header';
import { Footer } from '../../../components/footer/footer';
import { Formulario } from '../../../components/formulario/formulario';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-crear-usuario',
  imports: [Header,Footer,Formulario],
  templateUrl: './crear-usuario.html',
  styleUrl: './crear-usuario.css'
})
export class CrearUsuario {

  formConfig: any;

  constructor(public router: Router, private location: Location) {}

  ngOnInit() {

    this.formConfig = {
      title: 'Crear Usuario',
      cancelRoute: this.goBack.bind(this),
      submitText: 'CREAR USUARIO',
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
          type: 'email',
          name: 'mail',
          value: '',
          placeholder: "usuario@ejemplo.com",
          required: true 
        },
        { label: 'Contraseña:',
          type: 'password',
          name: 'password',
          value: '',
          placeholder: "contraseña...",
          required: true 
        },
        { label: 'Confirmar Contraseña:',
          type: 'password',
          name: 'confirmPassword',
          value: '',
          placeholder: "Repetir contraseña",
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

    this.crearUsuario=this.crearUsuario.bind(this);

  }

  goBack() {
    this.location.back(); 
  }

  //Deberia realizar el POST
  crearUsuario(){
    console.log('usuario creado:');
    this.router.navigate(['/usuarios']);
  }

}
