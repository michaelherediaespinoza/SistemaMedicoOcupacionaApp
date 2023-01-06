import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintConsultaPreocupacionalComponent } from './print-consulta-preocupacional.component';

describe('PrintConsultaPreocupacionalComponent', () => {
  let component: PrintConsultaPreocupacionalComponent;
  let fixture: ComponentFixture<PrintConsultaPreocupacionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintConsultaPreocupacionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintConsultaPreocupacionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
