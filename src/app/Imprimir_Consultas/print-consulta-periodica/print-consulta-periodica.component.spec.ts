import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintConsultaPeriodicaComponent } from './print-consulta-periodica.component';

describe('PrintConsultaPeriodicaComponent', () => {
  let component: PrintConsultaPeriodicaComponent;
  let fixture: ComponentFixture<PrintConsultaPeriodicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintConsultaPeriodicaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintConsultaPeriodicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
