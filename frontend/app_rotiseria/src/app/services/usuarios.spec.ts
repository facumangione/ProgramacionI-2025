import { TestBed } from '@angular/core/testing';

import { UsuariosSvc } from './usuarios';

describe('Usuarios', () => {
  let service: UsuariosSvc;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuariosSvc);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
