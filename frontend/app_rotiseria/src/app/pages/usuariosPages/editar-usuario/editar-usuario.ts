import { Component } from '@angular/core';
import { Header } from '../../../components/header/header';
import { Footer } from '../../../components/footer/footer';
import { Formulario } from '../../../components/formulario/formulario';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosSvc } from '../../../services/usuarios';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-usuario',
  imports: [Header,Footer,Formulario],
  templateUrl: './editar-usuario.html',
  styleUrl: './editar-usuario.css'
})
export class EditarUsuario {

  usuario: any;
  formConfig: any;
  usuarioForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    public router: Router, 
    private location: Location, 
    private usuariosSvc: UsuariosSvc,
    private formBuilder: FormBuilder
  ) {
    this.usuarioForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      mail: ['', [Validators.required, Validators.email]],
      rol: ['', [Validators.required]],
      activo: [false, [Validators.required]]
    })
  }

  ngOnInit() {
    this.formConfig = {
      title: 'Editar Usuario',
      cancelRoute: this.goBack.bind(this),
      submitText: 'EDITAR USUARIO',
      formGroup: this.usuarioForm,
      fields: [
        { label: 'Nombre Y Apellido:',
          type: 'text',
          formControlName: "nombre",
          name: 'nombre',
          value: '',
          placeholder: "Nombre y apellido completo...",
          required: true 
        },
        { label: 'Teléfono:',
          type: 'text',
          formControlName: "telefono",
          name: 'telefono',
          value: '',
          placeholder: "Teléfono...",
          required: true 
        },
        { label: 'Mail:',
          type: 'email',
          formControlName: "mail",
          name: 'mail',
          value: '',
          placeholder: "usuario@ejemplo.com",
          required: true 
        },
        { 
          label: 'Rol:', 
          type: 'select', 
          formControlName: "rol",
          name: 'rol',
          value: null,
          required: true,
          options: [
            { value: null, label: 'Seleccionar rol...',disabled: true },
            { value: "CLIENTE", label: "CLIENTE" },
            { value: "EMPLEADO", label: "EMPLEADO" },
            { value: "ADMIN", label: "ADMIN" },
          ]
        },
        { 
          label: 'ESTADO:', 
          type: 'select', 
          formControlName: "activo",
          name: 'activo',
          required: true,
          options: [
            { value: null, label: 'Seleccionar estado...',disabled: true },
            { value: true, label: "ACTIVO" },
            { value: false, label: "DESACTIVADO" },
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

  editarUsuario(){
    
    if (this.usuarioForm.invalid) {
      console.error('Formulario inválido');
      alert('Por favor complete todos los campos correctamente');
      return;
    }

    const formData = this.usuarioForm.value;
    const rol = localStorage.getItem('rol')
    
    if (rol === 'ADMIN'){
      this.adminPut(formData)
    } else if (rol === 'EMPLEADO'){
      this.empleadoPut(formData)
    } else {
      console.warn('No tiene permisos para editar el usuario');

    }
  }

  adminPut(formData: any){
    this.usuariosSvc.putUsuario({
      nombre: formData.nombre,
      telefono: Number(formData.telefono),
      mail: formData.mail,
      rol: formData.rol,
      activo: formData.activo
      },
      this.usuario.id_usuario
    ).subscribe({
      next: (res) => {
        console.log('Usuario editado exitosamente:', res);
        alert('Usuario editado exitosamente');
        this.router.navigate(['/usuarios']);
      },
      error: (err) => {
        console.error('Error al editar usuario:', err);
        alert('Error al editar usuario');
      }
    });
  }

  empleadoPut(formData: any){
    this.usuariosSvc.putUsuario({
      nombre: this.usuario.nombre,
      telefono: this.usuario.telefono,
      mail: this.usuario.mail,
      rol: this.usuario.rol,
      activo: formData.activo
      },
      this.usuario.id_usuario
    ).subscribe({
      next: (res) => {
        console.log('Usuario editado exitosamente:', res);
        alert('Usuario editado exitosamente');
        this.router.navigate(['/usuarios']);
      },
      error: (err) => {
        console.error('Error al editar usuario:', err);
        alert('Error al editar usuario');
      }
    });
  }

}
