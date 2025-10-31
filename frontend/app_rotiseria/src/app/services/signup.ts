import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupSVC {

  private http = inject(HttpClient);

  url = 'http://127.0.0.1:7000';
  
  signup(dataSignup:SignupRequest): Observable<any>{
    return this.http.post(this.url+'/auth/signin',dataSignup)
  }
  
}
