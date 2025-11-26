import { TestBed } from '@angular/core/testing';

import { EmailMasivo } from './email-masivo';

describe('EmailMasivo', () => {
  let service: EmailMasivo;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailMasivo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
