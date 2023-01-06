import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPacientesparaconsultaPreventivaComponent } from './list-pacientesparaconsulta-preventiva.component';

describe('ListPacientesparaconsultaPreventivaComponent', () => {
  let component: ListPacientesparaconsultaPreventivaComponent;
  let fixture: ComponentFixture<ListPacientesparaconsultaPreventivaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPacientesparaconsultaPreventivaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPacientesparaconsultaPreventivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
