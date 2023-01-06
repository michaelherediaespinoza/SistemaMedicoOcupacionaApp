import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintConsultaRetiroComponent } from './print-consulta-retiro.component';

describe('PrintConsultaRetiroComponent', () => {
  let component: PrintConsultaRetiroComponent;
  let fixture: ComponentFixture<PrintConsultaRetiroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintConsultaRetiroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintConsultaRetiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
