import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComidasSvc {

  private http = inject(HttpClient);

  url = 'http://127.0.0.1:7000';
  
  getComidas(): Observable<any>{
    let headers=new HttpHeaders({
      'Content-Type':'application/json'
    });
    return this.http.get(this.url+'/comidas', { headers })
  }

  getComidaById(id_comida: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get(`${this.url}/comida/${id_comida}`, { headers });
  }

  deleteComida(id_comida:number): Observable<any>{
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(`${this.url}/comida/${id_comida}`, { headers }); 
  }

  postComida(dataComida:ComidaRequest): Observable<any>{
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(this.url+'/comidas',dataComida,{ headers })
  }

  putComida(dataComida:ComidaRequest,id_comida:number): Observable<any>{
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`${this.url}/comida/${id_comida}`,dataComida ,{ headers });
  }
  
}
  