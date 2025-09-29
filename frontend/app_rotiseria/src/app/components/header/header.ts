import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink,FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header{

  @Output() searchEvent = new EventEmitter<string>();
  searchText: string = '';
  
  //rol: 'ADMIN' | 'CLIENTE' | null=null;
  rol: 'ADMIN' | 'CLIENTE' | null = 'ADMIN';
  //rol: 'ADMIN' | 'CLIENTE' | null = 'CLIENTE';

  usuario={
    id_usuario:1,
    nombre:'Ignacio Milutin',
    mail:'i.milutin@alumno.um.edu.ar',
    password:'1234',
    telefono:26164579875,
    rol:'ADMIN'
  }

  constructor(public router: Router) {}

  get isHome(): boolean {
    return this.router.url.startsWith('/home');
  }

  onSearch() {
    console.log('onSearch-> searchText:', this.searchText);
    this.searchEvent.emit(this.searchText);
    console.log('texto emitido', this.searchText)
  }

  goToPerfil(){
    this.router.navigate(['/perfil',this.usuario.id_usuario])
  }
  
}
