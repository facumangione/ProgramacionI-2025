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
    return this.http.get(`${this.url}/resenas?page=${page}&per_page=${per_page}`);
  }

  getResenasByUsuario(id_usuario: number,page: number, per_page: number): Observable<any> {
    return this.http.get(`${this.url}/resenas?id_usuario=${id_usuario}&page=${page}&per_page=${per_page}`);
  }

  getResenasByComida(id_comida: number,page: number, per_page: number): Observable<any> {
    return this.http.get(`${this.url}/resenas?id_comida=${id_comida}&page=${page}&per_page=${per_page}`);
  }

  getResenaById(id_resena: number): Observable<any> {
    return this.http.get(`${this.url}/resena/${id_resena}`);
  }

  deleteResena(id_resena:number): Observable<any>{
    return this.http.delete(`${this.url}/resena/${id_resena}`); 
  }

  postResena(dataResena:ResenaRequest): Observable<any>{
    return this.http.post(this.url+'/resenas',dataResena);
  }

  putResena(dataResena:ResenaRequest,id_resena:number): Observable<any>{
    return this.http.put(`${this.url}/resena/${id_resena}`,dataResena);
  }
  
}
