import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidosSvc {

  private http = inject(HttpClient);

  url = 'http://127.0.0.1:7000';
  
  getPedidos(page: number, per_page: number, estado: string, id_pedido: number): Observable<any> {
    return this.http.get(`${this.url}/pedidos?desc=True&estado=${encodeURIComponent(estado)}&id_pedido=${id_pedido}&page=${page}&per_page=${per_page}`);
  }

  getPedidoById(id_pedido: number): Observable<any> {
    return this.http.get(`${this.url}/pedido/${id_pedido}`);
  }

  getPedidosByUsuario(id_usuario: number, estado: string, id_pedido: any, page: number, per_page: number): Observable<any> {
    return this.http.get(`${this.url}/pedidos?desc=True&id_usuario=${id_usuario}&estado=${encodeURIComponent(estado)}&id_pedido=${id_pedido}&page=${page}&per_page=${per_page}`);
  }

  deletePedido(id_pedido: number): Observable<any> {
    return this.http.delete(`${this.url}/pedido/${id_pedido}`);
  }

  postPedido(dataPedido: PedidoPostRequest): Observable<any> {
    return this.http.post(`${this.url}/pedidos`, dataPedido);
  }

  putPedido(dataPedido: PedidoPutRequest, id_pedido: number): Observable<any> {
    return this.http.put(`${this.url}/pedido/${id_pedido}`, dataPedido);
  }
  
}
