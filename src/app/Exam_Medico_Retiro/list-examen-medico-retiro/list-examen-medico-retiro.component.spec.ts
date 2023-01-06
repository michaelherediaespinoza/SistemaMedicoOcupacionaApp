import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListExamenMedicoRetiroComponent } from './list-examen-medico-retiro.component';

describe('ListExamenMedicoRetiroComponent', () => {
  let component: ListExamenMedicoRetiroComponent;
  let fixture: ComponentFixture<ListExamenMedicoRetiroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListExamenMedicoRetiroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListExamenMedicoRetiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
