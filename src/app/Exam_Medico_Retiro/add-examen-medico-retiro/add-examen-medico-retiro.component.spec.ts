import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExamenMedicoRetiroComponent } from './add-examen-medico-retiro.component';

describe('AddExamenMedicoRetiroComponent', () => {
  let component: AddExamenMedicoRetiroComponent;
  let fixture: ComponentFixture<AddExamenMedicoRetiroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddExamenMedicoRetiroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExamenMedicoRetiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
