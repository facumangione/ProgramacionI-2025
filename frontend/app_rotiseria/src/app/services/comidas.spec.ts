import { TestBed } from '@angular/core/testing';

import { ComidasSvc } from './comidas';

describe('Comidas', () => {
  let service: ComidasSvc;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComidasSvc);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
