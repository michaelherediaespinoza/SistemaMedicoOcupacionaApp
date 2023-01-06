import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPacientesHistorialComponent } from './list-pacientes-historial.component';

describe('ListPacientesHistorialComponent', () => {
  let component: ListPacientesHistorialComponent;
  let fixture: ComponentFixture<ListPacientesHistorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPacientesHistorialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPacientesHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
