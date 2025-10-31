import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosSvc {

  private http = inject(HttpClient);

  url = 'http://127.0.0.1:7000';
  
  getUsuarios(page: number, per_page: number): Observable<any>{
    const token=localStorage.getItem('token') || '';
    let headers=new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':`Bearer ${token}`
    });
    return this.http.get(`${this.url}/usuarios?page=${page}&per_page=${per_page}`, { headers })
  }

  getUsuarioById(id_usuario: number): Observable<any> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.url}/usuario/${id_usuario}`, { headers });
  }

  deleteUsuario(id_usuario:number): Observable<any>{
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(`${this.url}/usuario/${id_usuario}`, { headers }); 
  }

  postUsuario(dataUsuario:UsuarioPostRequest): Observable<any>{
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(this.url+'/usuarios',dataUsuario)
  }

  putUsuario(dataUsuario:UsuarioPutRequest,id_usuario:number): Observable<any>{
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`${this.url}/usuario/${id_usuario}`,dataUsuario ,{ headers });
  }
  

}
