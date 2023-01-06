import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCertificadoAptitudComponent } from './add-certificado-aptitud.component';

describe('AddCertificadoAptitudComponent', () => {
  let component: AddCertificadoAptitudComponent;
  let fixture: ComponentFixture<AddCertificadoAptitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCertificadoAptitudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCertificadoAptitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
