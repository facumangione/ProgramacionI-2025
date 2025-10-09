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
        localStorage.setItem('id_usuario',res.id_usuario.toString());
        this.router.navigateByUrl('/home');

        const decodedToken: any=jwtDecode(res.access_token);
        const rol=decodedToken.rol
        if (rol){
          localStorage.setItem('rol', rol);
        }else{
          console.log('No se encontro el rol')
        }
      },
      error: (err)=> {
        alert('usuario o contraseña incorrectos');
        console.log('Error en el login: ',err); 
        localStorage.removeItem('token');
        localStorage.removeItem('mail');
        localStorage.removeItem('id_usuario');
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
