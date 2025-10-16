import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResenasSvc {

  private http = inject(HttpClient);

  url = 'http://127.0.0.1:7000';
  
  getResenas(): Observable<any>{
    const token=localStorage.getItem('token') || '';
    let headers=new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':`Bearer ${token}`
    });
    return this.http.get(this.url+'/resenas', { headers })
  }

  getResenasByUsuario(id_usuario: number): Observable<any> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.url}/resenas?id_usuario=${id_usuario}`, { headers });
  }

  getResenasByComida(id_comida: number): Observable<any> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.url}/resenas?id_usuario=${id_comida}`, { headers });
  }

  getResenaById(id_resena: number): Observable<any> {
     const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.url}/resena/${id_resena}`, { headers });
  }
  
}
