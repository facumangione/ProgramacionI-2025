import { TestBed } from '@angular/core/testing';

import { PedidosSvc } from './pedidos-svc';

describe('PedidosSvc', () => {
  let service: PedidosSvc;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PedidosSvc);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
