import { TestBed } from '@angular/core/testing';

import { ResenasSvc } from './resenas-svc';

describe('ResenasSvc', () => {
  let service: ResenasSvc;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResenasSvc);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
