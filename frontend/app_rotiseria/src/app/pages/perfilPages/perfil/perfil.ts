import { Component } from '@angular/core';
import { Header } from '../../../components/header/header';
import { Footer } from '../../../components/footer/footer';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosSvc } from '../../../services/usuarios';

@Component({
  selector: 'app-perfil',
  imports: [Header,Footer],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css'
})
export class Perfil {

  usuario: any;

  constructor(private router: Router, private usuariosSvc: UsuariosSvc, private route: ActivatedRoute) {}


  ngOnInit(){
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

  //eliminar perfil
  deleteUsuario(){
    this.router.navigate(['/home']) 
  };

  goToEditarPerfil(){
    this.router.navigate(['/perfil',this.usuario.id_usuario,'editar'])
  };

}

