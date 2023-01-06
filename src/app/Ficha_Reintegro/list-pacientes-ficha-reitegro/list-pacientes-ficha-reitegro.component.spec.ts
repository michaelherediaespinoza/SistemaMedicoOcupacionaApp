import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPacientesFichaReitegroComponent } from './list-pacientes-ficha-reitegro.component';

describe('ListPacientesFichaReitegroComponent', () => {
  let component: ListPacientesFichaReitegroComponent;
  let fixture: ComponentFixture<ListPacientesFichaReitegroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPacientesFichaReitegroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPacientesFichaReitegroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
