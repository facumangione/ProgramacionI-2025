import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Service: encapsula toda la comunicación HTTP con el backend para
// el recurso Promocion. Los componentes nunca llaman a HttpClient
// directamente, siempre pasan por acá -> reutilización y separación
// de responsabilidades (UI vs comunicación con la API).
@Injectable({
  providedIn: 'root'   // singleton: una sola instancia compartida en toda la app
})
export class PromocionesSvc {
  private http = inject(HttpClient);
  url = 'http://127.0.0.1:7000';

  getPromociones(soloActivas: boolean = false): Observable<any> {
    const query = soloActivas ? '?solo_activas=true' : '';
    return this.http.get(`${this.url}/promociones${query}`);
  }

  getPromocionById(id: number): Observable<any> {
    return this.http.get(`${this.url}/promocion/${id}`);
  }

  postPromocion(data: any): Observable<any> {
    return this.http.post(`${this.url}/promociones`, data);
  }

  putPromocion(data: any, id: number): Observable<any> {
    return this.http.put(`${this.url}/promocion/${id}`, data);
  }

  deletePromocion(id: number): Observable<any> {
    return this.http.delete(`${this.url}/promocion/${id}`);
  }
}
