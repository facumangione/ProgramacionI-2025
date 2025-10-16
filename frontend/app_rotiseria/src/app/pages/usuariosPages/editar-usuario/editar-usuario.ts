import { Component } from '@angular/core';
import { Header } from '../../../components/header/header';
import { Footer } from '../../../components/footer/footer';
import { Formulario } from '../../../components/formulario/formulario';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosSvc } from '../../../services/usuarios';

@Component({
  selector: 'app-editar-usuario',
  imports: [Header,Footer,Formulario],
  templateUrl: './editar-usuario.html',
  styleUrl: './editar-usuario.css'
})
export class EditarUsuario {

  usuario: any;
  formConfig: any;

  constructor(private route: ActivatedRoute,public router: Router, private location: Location, private usuariosSvc: UsuariosSvc) {}

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
          type: 'email',
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

    const id = Number(this.route.snapshot.paramMap.get('id_usuario'));
    this.usuariosSvc.getUsuarioById(id).subscribe({
    next: (res) => {
      console.log('Usuario encontrado:', res);
      this.usuario = res;
    },
    error: (err) => {
      console.error('Error al traer usuario:', err);
    }
    });
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
