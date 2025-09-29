import { Component } from '@angular/core';
import { Header } from '../../../components/header/header';
import { Footer } from '../../../components/footer/footer';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuarios',
  imports: [Header,Footer,FormsModule],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css'
})
export class Usuarios {

  nombreBuscado!: string;

  usuarios=[
    {
      id_usuario:1,
      nombre:'Ignacio Milutin',
      mail:'i.milutin@alumno.um.edu.ar',
      password:'1234',
      telefono:26164579875,
      rol:'ADMIN'
    },
    {
      id_usuario:2,
      nombre:'Santiago Escudero',
      mail:'s.escudero@alumno.um.edu.ar',
      password:'5678',
      telefono:2613466782,
      rol:'CLIENTE'
    },
  ]

  arrayFiltred=[...this.usuarios]

  constructor(private router: Router) {}

  buscar(){
    let nombreBuscado = this.nombreBuscado.toLowerCase();
    this.arrayFiltred=this.usuarios.filter(u => u.nombre.toLowerCase().includes(nombreBuscado))
  }

  //Deberia hacer delete de la usuario
  eliminarUsuario(id_usuario:any) {
    console.log("usuario eliminado")
    this.router.navigate(['/usuarios']);
  }

  goToEditarUsuario(id_usuario:any){
    console.log("redirigido a editar usuario en:  /usuario",id_usuario,"editar" )
    this.router.navigate(['/usuario',id_usuario,'editar'])
  }

  goToCrearUsuario(){
    console.log("redirigido a crear usuario")
    this.router.navigate(['/usuarios/crear'])
  }

}
