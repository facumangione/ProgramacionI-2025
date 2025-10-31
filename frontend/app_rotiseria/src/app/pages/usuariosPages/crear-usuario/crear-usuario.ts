import { Component } from '@angular/core';
import { Header } from '../../../components/header/header';
import { Footer } from '../../../components/footer/footer';
import { Formulario } from '../../../components/formulario/formulario';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosSvc } from '../../../services/usuarios';

@Component({
  selector: 'app-crear-usuario',
  imports: [Header,Footer,Formulario],
  templateUrl: './crear-usuario.html',
  styleUrl: './crear-usuario.css'
})
export class CrearUsuario {

  formConfig: any;
  usuarioForm!: FormGroup;

  constructor(
    public router: Router, 
    private location: Location,
    private usuariosSvc: UsuariosSvc,
    private formBuilder: FormBuilder
  ) {
    this.usuarioForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      mail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      rol: [null, [Validators.required]]
    })
  }

  ngOnInit() {

    this.formConfig = {
      title: 'Crear Usuario',
      cancelRoute: this.goBack.bind(this),
      submitText: 'CREAR USUARIO',
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
        { label: 'Contraseña:',
          type: 'password',
          formControlName: "password",
          name: 'password',
          value: '',
          placeholder: "contraseña...",
          required: true 
        },
        { label: 'Confirmar Contraseña:',
          type: 'password',
          formControlName: "confirmPassword",
          name: 'confirmPassword',
          value: '',
          placeholder: "Repetir contraseña",
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

  crearUsuario(){
    
    if (this.usuarioForm.invalid) {
      console.error('Formulario inválido');
      alert('Por favor complete todos los campos correctamente');
      return;
    }

    const formData = this.usuarioForm.value;
    
    if (formData.password !== formData.confirmPassword) {
      console.error('Las contraseñas no coinciden');
      alert('Las contraseñas no coinciden');
      return;
    }

    this.usuariosSvc.postUsuario({
      nombre: formData.nombre,
      telefono: Number(formData.telefono),
      mail: formData.mail,
      password: formData.password,
      rol: formData.rol
    }).subscribe({
      next: (res) => {
        console.log('Usuario creado exitosamente:', res);
        alert('Usuario creado exitosamente');
        this.router.navigate(['/usuarios']);
      },
      error: (err) => {
        console.error('Error al crear usuario:', err);
        alert('Error al crear usuario');
      }
    });
  }
}


