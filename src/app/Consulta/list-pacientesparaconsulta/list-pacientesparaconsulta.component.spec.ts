import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPacientesparaconsultaComponent } from './list-pacientesparaconsulta.component';

describe('ListPacientesparaconsultaComponent', () => {
  let component: ListPacientesparaconsultaComponent;
  let fixture: ComponentFixture<ListPacientesparaconsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPacientesparaconsultaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPacientesparaconsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
