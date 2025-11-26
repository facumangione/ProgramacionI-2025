import { Component } from '@angular/core';
import { Route, Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  loginForm: FormGroup;

  constructor(
    private authServices:Auth,
    private router: Router,
    private formBuilder: FormBuilder
  ){
    this.loginForm=this.formBuilder.group({
      email:['ignaciomilutin@gmail.com',[Validators.required,Validators.email]],
      password:['hola',[Validators.required]]
    })
  }

  irLogin(){
    this.authServices.login({
        mail: this.loginForm.value.email,
        password: this.loginForm.value.password})
      .subscribe({
      next: (res:LoginResponse)=> {
        alert("LOGIN EXITOSO");
        console.log('Respuesta login: ',res);
        localStorage.setItem('token',res.access_token);
        localStorage.setItem('mail',res.mail);
        this.router.navigateByUrl('/home');

        const decodedToken: any=jwtDecode(res.access_token);
        
        const rol=decodedToken.rol
        if (rol){
          localStorage.setItem('rol', rol);
        }else{
          console.log('No se encontro el rol')
        }

        const id_usuario=decodedToken.id
        if (id_usuario){
          localStorage.setItem('id_usuario', id_usuario);
        }else{
          console.log('No se encontro el id')
        }
      },
      error: (err)=> {
        if (err.error==='Tu cuenta está desactivada. Consulta para activarla'){
          alert('Tu cuenta está desactivada. Consulta al local para activarla')
        } else { 
          alert('usuario o contraseña incorrectos')
        };
        console.log('Error en el login: ',err); 
        localStorage.removeItem('token');
        localStorage.removeItem('mail');
        localStorage.removeItem('id_usuario');
        localStorage.removeItem('rol');
      }
    })
  }

  submit(){
    if(this.loginForm.valid){
      this.irLogin();
    } else {
      alert("Usuario o contraseña requeridos")
    }

  }

}
