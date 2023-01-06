import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConsultaPreocupacionalComponent } from './add-consulta-preocupacional.component';

describe('AddConsultaPreocupacionalComponent', () => {
  let component: AddConsultaPreocupacionalComponent;
  let fixture: ComponentFixture<AddConsultaPreocupacionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddConsultaPreocupacionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddConsultaPreocupacionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
