import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExamenInicialComponent } from './add-examen-inicial.component';

describe('AddExamenInicialComponent', () => {
  let component: AddExamenInicialComponent;
  let fixture: ComponentFixture<AddExamenInicialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddExamenInicialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExamenInicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
