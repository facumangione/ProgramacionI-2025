import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderGuest } from './header';

describe('HeaderGuest', () => {
  let component: HeaderGuest;
  let fixture: ComponentFixture<HeaderGuest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderGuest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderGuest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
