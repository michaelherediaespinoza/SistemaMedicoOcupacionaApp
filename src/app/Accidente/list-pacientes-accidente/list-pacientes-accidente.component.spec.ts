import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPacientesAccidenteComponent } from './list-pacientes-accidente.component';

describe('ListPacientesAccidenteComponent', () => {
  let component: ListPacientesAccidenteComponent;
  let fixture: ComponentFixture<ListPacientesAccidenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPacientesAccidenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPacientesAccidenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
