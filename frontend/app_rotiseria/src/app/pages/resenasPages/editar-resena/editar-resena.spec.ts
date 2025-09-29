import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarResena } from './editar-resena';

describe('EditarResena', () => {
  let component: EditarResena;
  let fixture: ComponentFixture<EditarResena>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarResena]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarResena);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
