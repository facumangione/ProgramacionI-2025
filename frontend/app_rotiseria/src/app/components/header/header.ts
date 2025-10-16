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
    const id_usuario = localStorage.getItem('id_usuario')
    this.router.navigate(['/perfil',id_usuario])
  }

  goToPedidos(){
    this.router.navigate(['/pedidos']);
  }

  goToComidas(){
    this.router.navigate(['/comidas']);
  }

  isToken(){
    return localStorage.getItem('token');
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('mail');
    localStorage.removeItem('id_usuario');
    localStorage.removeItem('rol');
  }

  getRol(){
    return localStorage.getItem('rol');
  }
  
}
