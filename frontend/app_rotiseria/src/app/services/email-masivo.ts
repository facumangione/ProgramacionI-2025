import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailMasivoService {

  private http = inject(HttpClient);
  url = 'http://127.0.0.1:7000';

  enviarEmailMasivo(asunto: string, mensaje: string): Observable<any> {
    return this.http.post(`${this.url}/email-masivo`, {
      asunto: asunto,
      mensaje: mensaje
    });
  }
}