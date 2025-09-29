import { Component } from '@angular/core';
import { Header } from '../../../components/header/header';
import { Footer } from '../../../components/footer/footer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  imports: [Header,Footer],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css'
})
export class Perfil {

  usuario={
    id_usuario:1,
    nombre:'Ignacio Milutin',
    mail:'i.milutin@alumno.um.edu.ar',
    password:'1234',
    telefono:26164579875,
    rol:'ADMIN'
  }

  constructor(private router: Router) {}

  //eliminar perfil
  deleteUsuario(){
    this.router.navigate(['/home']) 
  }

  goToEditarPerfil(){
    this.router.navigate(['/perfil',this.usuario.id_usuario,'editar'])
  }

}
