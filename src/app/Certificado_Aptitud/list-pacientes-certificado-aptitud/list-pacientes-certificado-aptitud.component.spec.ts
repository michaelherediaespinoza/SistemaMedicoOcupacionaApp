import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPacientesCertificadoAptitudComponent } from './list-pacientes-certificado-aptitud.component';

describe('ListPacientesCertificadoAptitudComponent', () => {
  let component: ListPacientesCertificadoAptitudComponent;
  let fixture: ComponentFixture<ListPacientesCertificadoAptitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPacientesCertificadoAptitudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPacientesCertificadoAptitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
