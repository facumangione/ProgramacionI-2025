import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { usermatchGuard } from './usermatch-guard';

describe('usermatchGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => usermatchGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
