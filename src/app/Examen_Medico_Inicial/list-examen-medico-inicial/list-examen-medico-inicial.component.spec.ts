import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListExamenMedicoInicialComponent } from './list-examen-medico-inicial.component';

describe('ListExamenMedicoInicialComponent', () => {
  let component: ListExamenMedicoInicialComponent;
  let fixture: ComponentFixture<ListExamenMedicoInicialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListExamenMedicoInicialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListExamenMedicoInicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
