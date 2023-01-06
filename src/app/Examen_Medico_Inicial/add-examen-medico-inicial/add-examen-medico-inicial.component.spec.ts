import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExamenMedicoInicialComponent } from './add-examen-medico-inicial.component';

describe('AddExamenMedicoInicialComponent', () => {
  let component: AddExamenMedicoInicialComponent;
  let fixture: ComponentFixture<AddExamenMedicoInicialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddExamenMedicoInicialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExamenMedicoInicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
