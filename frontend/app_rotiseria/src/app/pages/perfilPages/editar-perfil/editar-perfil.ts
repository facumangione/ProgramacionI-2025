import { Component } from '@angular/core';
import { Header } from '../../../components/header/header';
import { Footer } from '../../../components/footer/footer';
import { Formulario } from '../../../components/formulario/formulario';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosSvc } from '../../../services/usuarios';

@Component({
  selector: 'app-editar-perfil',
  imports: [Header,Footer,Formulario],
  templateUrl: './editar-perfil.html',
  styleUrl: './editar-perfil.css'
})
export class EditarPerfil {

  // usuario = {
  //   id_usuario:1,
  //   nombre: 'Ignacio Milutin',
  //   mail: 'i.milutin@alumno.um.edu.ar',
  //   telefono: 26164579875,
  //   rol: 'ADMIN'
  // };

  usuario: any;
  formConfig: any;

  constructor(private route: ActivatedRoute,public router: Router, private usuariosSvc: UsuariosSvc) {}
  

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id_usuario')); 

    this.formConfig = {
      title: 'Editar Perfil',
      cancelRoute: `/perfil/${id}`,
      submitText: 'GUARDAR CAMBIOS',
      fields: [
        { label: 'Nombre:', type: 'text', name: 'nombre', required: true },
        { label: 'Teléfono:', type: 'tel', name: 'telefono', required: true },
        { label: 'Mail:', type: 'email', name: 'mail', required: true },
        { 
          label: 'Rol:', 
          type: 'select', 
          name: 'rol',
          options: [
            { value: 'ADMIN', label: 'ADMIN' },
            { value: 'CLIENTE', label: 'CLIENTE' }
          ]
        }
      ]
    };

    this.editarPerfil = this.editarPerfil.bind(this);

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

  //Deberia realizar el PUT, en el estado de ahora no trae los campos ingresados
  editarPerfil(fields: any){
    console.log('Usuario actualizado:', this.usuario);
    this.router.navigate(['/perfil', this.usuario.id_usuario]);
  }

}
