import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPacientesEmiComponent } from './list-pacientes-emi.component';

describe('ListPacientesEmiComponent', () => {
  let component: ListPacientesEmiComponent;
  let fixture: ComponentFixture<ListPacientesEmiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPacientesEmiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPacientesEmiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
