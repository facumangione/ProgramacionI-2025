import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviarMailMasivo } from './enviar-mail-masivo';

describe('EnviarMailMasivo', () => {
  let component: EnviarMailMasivo;
  let fixture: ComponentFixture<EnviarMailMasivo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnviarMailMasivo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnviarMailMasivo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
