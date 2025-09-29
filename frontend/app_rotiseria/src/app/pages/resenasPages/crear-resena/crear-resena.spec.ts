import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearResena } from './crear-resena';

describe('CrearResena', () => {
  let component: CrearResena;
  let fixture: ComponentFixture<CrearResena>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearResena]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearResena);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
