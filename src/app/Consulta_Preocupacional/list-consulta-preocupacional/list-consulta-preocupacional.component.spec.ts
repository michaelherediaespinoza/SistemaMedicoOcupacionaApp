import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListConsultaPreocupacionalComponent } from './list-consulta-preocupacional.component';

describe('ListConsultaPreocupacionalComponent', () => {
  let component: ListConsultaPreocupacionalComponent;
  let fixture: ComponentFixture<ListConsultaPreocupacionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListConsultaPreocupacionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListConsultaPreocupacionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
