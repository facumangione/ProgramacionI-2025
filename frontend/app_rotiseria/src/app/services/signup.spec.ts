import { TestBed } from '@angular/core/testing';

import { SignupSVC } from './signup';

describe('Signup', () => {
  let service: SignupSVC;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignupSVC);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
