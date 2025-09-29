import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearComida } from './crear-comida';

describe('CrearComida', () => {
  let component: CrearComida;
  let fixture: ComponentFixture<CrearComida>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearComida]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearComida);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
