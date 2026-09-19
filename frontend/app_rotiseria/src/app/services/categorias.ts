import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriasSvc {
  private http = inject(HttpClient);
  url = 'http://127.0.0.1:7000';

  getCategorias(): Observable<any> {
    return this.http.get(`${this.url}/categorias`);
  }
}
