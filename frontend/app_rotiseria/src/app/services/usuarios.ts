import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosSvc {

  private http = inject(HttpClient);

  url = 'http://127.0.0.1:7000';

  getUsuarios(page: number, per_page: number, rol: string, nombre: string, activo?: boolean): Observable<any> {
    let query = `${this.url}/usuarios?rol=${encodeURIComponent(rol)}&nombre=${encodeURIComponent(nombre)}&page=${page}&per_page=${per_page}`;
    if (activo !== undefined) {
      query += `&activo=${activo}`;
    }
    return this.http.get(query);
  }

  getUsuarioById(id_usuario: number): Observable<any> {
    return this.http.get(`${this.url}/usuario/${id_usuario}`);
  }

  deleteUsuario(id_usuario: number): Observable<any> {
    return this.http.delete(`${this.url}/usuario/${id_usuario}`);
  }

  postUsuario(dataUsuario: any): Observable<any> {
    return this.http.post(`${this.url}/usuarios`, dataUsuario);
  }

  putUsuario(dataUsuario: any, id_usuario: number): Observable<any> {
    return this.http.put(`${this.url}/usuario/${id_usuario}`, dataUsuario);
  }

  activarUsuario(id_usuario: number): Observable<any> {
    return this.http.put(`${this.url}/usuario/${id_usuario}`, { activo: true });
  }

  desbloquearUsuario(id_usuario: number): Observable<any> {
    return this.http.put(`${this.url}/usuario/${id_usuario}`, { bloqueado: false, activo: true, cancelaciones: 0 });
  }
}