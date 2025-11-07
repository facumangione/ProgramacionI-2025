import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComidasSvc {

  private http = inject(HttpClient);

  url = 'http://127.0.0.1:7000';

  getComidas(): Observable<any> {
    return this.http.get(`${this.url}/comidas?page=1&per_page=999`);
  }
  
  getComidasPaginado(page: number, per_page: number): Observable<any> {
    return this.http.get(`${this.url}/comidas?page=${page}&per_page=${per_page}`);
  }

  getComidaById(id_comida: number): Observable<any> {
    return this.http.get(`${this.url}/comida/${id_comida}`);
  }

  deleteComida(id_comida: number): Observable<any> {
    return this.http.delete(`${this.url}/comida/${id_comida}`);
  }

  postComida(dataComida: ComidaRequest): Observable<any> {
    return this.http.post(`${this.url}/comidas`, dataComida);
  }

  putComida(dataComida: ComidaRequest, id_comida: number): Observable<any> {
    return this.http.put(`${this.url}/comida/${id_comida}`, dataComida);
  }
  
}
  