import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResenasSvc {

  private http = inject(HttpClient);

  url = 'http://127.0.0.1:7000';
  
  getResenas(page: number, per_page: number): Observable<any>{
    const token=localStorage.getItem('token') || '';
    let headers=new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':`Bearer ${token}`
    });
    return this.http.get(`${this.url}/resenas?page=${page}&per_page=${per_page}`, { headers })
  }

  getResenasByUsuario(id_usuario: number,page: number, per_page: number): Observable<any> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.url}/resenas?id_usuario=${id_usuario}&page=${page}&per_page=${per_page}`, { headers });
  }

  getResenasByComida(id_comida: number,page: number, per_page: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get(`${this.url}/resenas?id_comida=${id_comida}&page=${page}&per_page=${per_page}`, { headers });
  }

  getResenaById(id_resena: number): Observable<any> {
     const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.url}/resena/${id_resena}`, { headers });
  }

  deleteResena(id_resena:number): Observable<any>{
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(`${this.url}/resena/${id_resena}`, { headers }); 
  }

  postResena(dataResena:ResenaRequest): Observable<any>{
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(this.url+'/resenas',dataResena,{ headers })
  }

  putResena(dataResena:ResenaRequest,id_resena:number): Observable<any>{
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`${this.url}/resena/${id_resena}`,dataResena ,{ headers });
  }
  
}
