import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { roladminGuard } from './roladmin-guard';

describe('roladminGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => roladminGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
