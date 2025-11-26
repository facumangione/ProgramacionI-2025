import { Component } from '@angular/core';
import { Header } from '../../../components/header/header';
import { Footer } from '../../../components/footer/footer';
import { Formulario } from '../../../components/formulario/formulario';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosSvc } from '../../../services/usuarios';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-perfil',
  imports: [Header,Footer,Formulario],
  templateUrl: './editar-perfil.html',
  styleUrl: './editar-perfil.css'
})
export class EditarPerfil {

  usuario: any;
  formConfig: any;
  usuarioForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    public router: Router, 
    private usuariosSvc: UsuariosSvc,
    private formBuilder: FormBuilder
  ) {
    this.usuarioForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      mail: ['', [Validators.required, Validators.email]],
      rol: ['', [Validators.required]]
    })
  }
  

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id_usuario')); 

    this.formConfig = {
      title: 'Editar Perfil',
      cancelRoute: `/perfil/${id}`,
      submitText: 'GUARDAR CAMBIOS',
      formGroup: this.usuarioForm,
      fields: [
        { label: 'Nombre:', 
          type: 'text', 
          formControlName: "nombre",
          name: 'nombre', 
          required: true 
        },
        { label: 'Teléfono:', 
          type: 'tel', 
          formControlName: "telefono",
          name: 'telefono', 
          required: true 
        },
        { label: 'Mail:', 
          type: 'email', 
          formControlName: "mail",
          name: 'mail', 
          required: true 
        },
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

  
  editarPerfil(fields: any){

    if (this.usuarioForm.invalid) {
      console.error('Formulario inválido');
      alert('Por favor complete todos los campos correctamente');
      return;
    }

    const formData = this.usuarioForm.value;

    this.usuariosSvc.putUsuario({
      nombre: formData.nombre,
      telefono: Number(formData.telefono),
      mail: formData.mail,
      rol: this.usuario.rol,
      activo: this.usuario.activo
      },
      this.usuario.id_usuario
    ).subscribe({
      next: (res) => {
        console.log('Perfil editado exitosamente:', res);
        alert('Perfil editado exitosamente');
        this.router.navigate(['/perfil',this.usuario.id_usuario]);
      },
      error: (err) => {
        console.error('Error al editar perfil:', err);
        alert('Error al perfil usuario');
      }
    });
  }

}
