import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarComida } from './editar-comida';

describe('EditarComida', () => {
  let component: EditarComida;
  let fixture: ComponentFixture<EditarComida>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarComida]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarComida);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
