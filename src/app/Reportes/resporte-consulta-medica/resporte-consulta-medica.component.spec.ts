import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResporteConsultaMedicaComponent } from './resporte-consulta-medica.component';

describe('ResporteConsultaMedicaComponent', () => {
  let component: ResporteConsultaMedicaComponent;
  let fixture: ComponentFixture<ResporteConsultaMedicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResporteConsultaMedicaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResporteConsultaMedicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
