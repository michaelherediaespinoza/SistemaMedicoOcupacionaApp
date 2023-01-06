import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCertificadoAptitudComponent } from './list-certificado-aptitud.component';

describe('ListCertificadoAptitudComponent', () => {
  let component: ListCertificadoAptitudComponent;
  let fixture: ComponentFixture<ListCertificadoAptitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCertificadoAptitudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCertificadoAptitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
