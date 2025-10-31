import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidosSvc {

  private http = inject(HttpClient);

  url = 'http://127.0.0.1:7000';
  
  getPedidos(page: number, per_page: number,estado:string,id_pedido:number): Observable<any>{
    const token=localStorage.getItem('token') || '';
    let headers=new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':`Bearer ${token}`
    });
    return this.http.get(`${this.url}/pedidos?desc=True&estado=${estado}&id_pedido=${id_pedido}&page=${page}&per_page=${per_page}`, { headers })
  }

  getPedidoById(id_pedido: number): Observable<any> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.url}/pedido/${id_pedido}`, { headers });
  }

  getPedidosByUsuario(id_usuario: number, estado:string, id_pedido:any, page: number, per_page: number): Observable<any> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.url}/pedidos??desc=True&id_usuario=${id_usuario}&estado=${estado}&id_pedido=${id_pedido}&page=${page}&per_page=${per_page}`, { headers });
  }

  deletePedido(id_pedido:number): Observable<any>{
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(`${this.url}/pedido/${id_pedido}`, { headers }); 
  }

  postPedido(dataPedido:PedidoPostRequest): Observable<any>{
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(this.url+'/pedidos',dataPedido,{ headers })
  }

  putPedido(dataPedido:PedidoPutRequest,id_pedido:number): Observable<any>{
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`${this.url}/pedido/${id_pedido}`,dataPedido ,{ headers });
  }
  
}
