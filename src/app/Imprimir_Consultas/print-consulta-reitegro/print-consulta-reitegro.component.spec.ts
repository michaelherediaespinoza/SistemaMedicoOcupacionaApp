import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintConsultaReitegroComponent } from './print-consulta-reitegro.component';

describe('PrintConsultaReitegroComponent', () => {
  let component: PrintConsultaReitegroComponent;
  let fixture: ComponentFixture<PrintConsultaReitegroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintConsultaReitegroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintConsultaReitegroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
