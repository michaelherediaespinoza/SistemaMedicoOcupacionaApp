import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPacientesConsultaPreocupacionalComponent } from './list-pacientes-consulta-preocupacional.component';

describe('ListPacientesConsultaPreocupacionalComponent', () => {
  let component: ListPacientesConsultaPreocupacionalComponent;
  let fixture: ComponentFixture<ListPacientesConsultaPreocupacionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPacientesConsultaPreocupacionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPacientesConsultaPreocupacionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
