import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SignupSVC } from '../../services/signup';

@Component({
  selector: 'app-signup',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {

  signupForm:FormGroup;

  constructor(
      private signupServices:SignupSVC,
      private formBuilder: FormBuilder,
      private router: Router
    ){
      this.signupForm=this.formBuilder.group({
      nombre: ['',Validators.required,],
      telefono: ['',Validators.required],
      mail:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]],
      confirmPassword:['',[Validators.required]],
      rol:['CLIENTE',[Validators.required]]      
    })
  }

  signup(){

    if (this.signupForm.value.password !== this.signupForm.value.confirmPassword) {
      console.error('Las contraseñas no coinciden');
      alert('Las contraseñas no coinciden');
      return;
    }

    this.signupServices.signup({
      nombre: this.signupForm.value.nombre,
      telefono: this.signupForm.value.telefono,
      mail: this.signupForm.value.mail,
      password: this.signupForm.value.password,
      rol: this.signupForm.value.rol
    }).subscribe({
        next: (res)=>{
          alert("SIGNUP EXITOSO");
          this.signupForm.reset();
          this.router.navigateByUrl('/login');        
        },
        error: (err)=>{
          alert("SIGNUP FALLIDO");
        }
      })
  }


  submit(){
    if(this.signupForm.valid){
      this.signup();
    } else{
      alert("Formulario invalido, rellenar todos los campos")
      console.log(this.signupForm.value)
    }
  }

}